// Members Management System with Modal Popups
class MembersManager {
    constructor() {
        this.members = {
            currentMembers: [],
            veupathdbStaff: [],
            alumni: {}
        };
        this.modal = null;
        this.modalBody = null;
        this.init();
    }

    async init() {
        await this.loadMembers();
        this.setupModal();
        this.displayPI();
        this.displayCurrentMembers();
        this.displayVEuPathDBStaff();
        this.displayAlumni();
    }

    async loadMembers() {
        try {
            const response = await fetch('data/members.json');
            const data = await response.json();
            this.members = data;
        } catch (error) {
            console.error('Error loading members data:', error);
            this.showError('Failed to load team members. Please try again later.');
        }
    }

    setupModal() {
        this.modal = document.getElementById('memberModal');
        this.modalBody = document.getElementById('modalBody');
        const closeBtn = document.querySelector('.modal-close');

        closeBtn.onclick = () => this.closeModal();

        window.onclick = (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        };

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal(member) {
        const fullBio = member.fullBio || member.bio;

        let modalContent = `
            <div class="modal-header-custom">
                <img src="${member.image}" alt="${member.name}" class="modal-photo" onerror="this.src='images/placeholder-member.jpg'">
                <div class="modal-header-text">
                    <h2>${member.name}</h2>
                    <p class="modal-title">${member.title}</p>
                    ${member.role ? `<p class="modal-role">${member.role}</p>` : ''}
                </div>
            </div>
            <div class="modal-details">
                ${member.positions ? `
                    <div class="modal-positions">
                        <strong>Positions:</strong>
                        <ul>
                            ${member.positions.map(pos => `<li>${pos}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="modal-bio">
                    <strong>Biography:</strong>
                    <p>${fullBio}</p>
                </div>
                ${member.education ? `
                    <div class="modal-education">
                        <strong>Education:</strong>
                        <p>${member.education}</p>
                    </div>
                ` : ''}
                ${member.award ? `
                    <div class="modal-award">
                        <strong>Awards:</strong>
                        <p>${member.award}</p>
                    </div>
                ` : ''}
                <div class="modal-interests">
                    <strong>Research Interests:</strong>
                    <div class="interest-tags-modal">
                        ${member.interests.map(interest => `<span class="interest-tag-modal">${interest}</span>`).join('')}
                    </div>
                </div>
                ${member.email ? `
                    <div class="modal-contact">
                        <strong>Contact:</strong>
                        <p><a href="mailto:${member.email}">${member.email}</a></p>
                    </div>
                ` : ''}
            </div>
        `;

        this.modalBody.innerHTML = modalContent;
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    displayPI() {
        const container = document.getElementById('piContainer');
        const pi = this.members.currentMembers.find(m => m.category === 'pi');

        if (!pi) return;

        container.innerHTML = `
            <div class="member-card member-card-featured animate-fade-in clickable" data-member-id="${pi.id}">
                <div class="member-photo-large">
                    <img src="${pi.image}" alt="${pi.name}" onerror="this.src='images/placeholder-member.jpg'">
                    <div class="photo-overlay">Click for details</div>
                </div>
                <div class="member-info-large">
                    <h3 class="member-name-large">${pi.name}</h3>
                    <p class="member-title-large">${pi.title}</p>
                    <p class="member-bio">${pi.bio}</p>
                    <div class="member-interests">
                        <strong>Research Interests:</strong>
                        <div class="interest-tags">
                            ${pi.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
                        </div>
                    </div>
                    ${pi.email ? `<p class="member-contact"><strong>Email:</strong> <a href="mailto:${pi.email}">${pi.email}</a></p>` : ''}
                    <button class="btn-view-details">View Full Profile</button>
                </div>
            </div>
        `;

        container.querySelector('.clickable').addEventListener('click', () => this.openModal(pi));
        setTimeout(() => container.querySelector('.member-card-featured').classList.add('visible'), 100);
    }

    displayCurrentMembers() {
        const container = document.getElementById('currentMembersContainer');
        const currentMembers = this.members.currentMembers.filter(m => m.category !== 'pi');

        if (currentMembers.length === 0) {
            container.innerHTML = '<p class="no-members">No current lab members.</p>';
            return;
        }

        container.innerHTML = currentMembers.map((member, index) => `
            <div class="member-card animate-slide-up clickable" style="animation-delay: ${index * 0.1}s" data-member-id="${member.id}">
                <div class="member-photo">
                    <img src="${member.image}" alt="${member.name}" onerror="this.src='images/placeholder-member.jpg'">
                    <div class="photo-overlay">Click for details</div>
                </div>
                <div class="member-info">
                    <h4 class="member-name">${member.name}</h4>
                    <p class="member-title">${member.title}</p>
                    <p class="member-bio-short">${member.bio}</p>
                    <div class="member-interests-compact">
                        ${member.interests.slice(0, 3).map(interest => `<span class="interest-tag-small">${interest}</span>`).join('')}
                    </div>
                    <button class="btn-view-details-small">View Profile</button>
                </div>
            </div>
        `).join('');

        // Add click handlers
        currentMembers.forEach(member => {
            const card = container.querySelector(`[data-member-id="${member.id}"]`);
            card.addEventListener('click', () => this.openModal(member));
        });

        setTimeout(() => {
            container.querySelectorAll('.member-card').forEach(card => card.classList.add('visible'));
        }, 100);
    }

    displayVEuPathDBStaff() {
        const container = document.getElementById('veupathdbContainer');
        const staff = this.members.veupathdbStaff;

        if (!staff || staff.length === 0) {
            container.innerHTML = '<p class="no-members">No VEuPathDB staff members listed.</p>';
            return;
        }

        container.innerHTML = staff.map((member, index) => `
            <div class="member-card animate-slide-up clickable" style="animation-delay: ${index * 0.1}s" data-member-id="${member.id}">
                <div class="member-photo">
                    <img src="${member.image}" alt="${member.name}" onerror="this.src='images/placeholder-member.jpg'">
                    <div class="photo-overlay">Click for details</div>
                </div>
                <div class="member-info">
                    <h4 class="member-name">${member.name}</h4>
                    <p class="member-title">${member.title}</p>
                    <p class="member-bio-short">${member.bio}</p>
                    <div class="member-interests-compact">
                        ${member.interests.slice(0, 3).map(interest => `<span class="interest-tag-small">${interest}</span>`).join('')}
                    </div>
                    <button class="btn-view-details-small">View Profile</button>
                </div>
            </div>
        `).join('');

        // Add click handlers
        staff.forEach(member => {
            const card = container.querySelector(`[data-member-id="${member.id}"]`);
            card.addEventListener('click', () => this.openModal(member));
        });

        setTimeout(() => {
            container.querySelectorAll('.member-card').forEach(card => card.classList.add('visible'));
        }, 100);
    }

    displayAlumni() {
        const container = document.getElementById('alumniContainer');
        const alumni = this.members.alumni;

        if (!alumni) {
            container.innerHTML = '<p class="no-members">No alumni listed.</p>';
            return;
        }

        let html = '';

        if (alumni.postdocs && alumni.postdocs.length > 0) {
            html += this.createAlumniSection('Former Postdocs', alumni.postdocs);
        }
        if (alumni.phdStudents && alumni.phdStudents.length > 0) {
            html += this.createAlumniSection('Former PhD Students', alumni.phdStudents);
        }
        if (alumni.mastersStudents && alumni.mastersStudents.length > 0) {
            html += this.createAlumniSection('Former Master\'s Students', alumni.mastersStudents);
        }
        if (alumni.staff && alumni.staff.length > 0) {
            html += this.createAlumniSection('Former Staff', alumni.staff);
        }
        if (alumni.visitingScholars && alumni.visitingScholars.length > 0) {
            html += this.createAlumniSection('Former Visiting Scholars', alumni.visitingScholars);
        }
        if (alumni.undergrads && alumni.undergrads.length > 0) {
            html += this.createAlumniSection('Former Undergraduate Researchers', alumni.undergrads);
        }

        container.innerHTML = html;

        setTimeout(() => {
            container.querySelectorAll('.alumni-section').forEach((section, index) => {
                setTimeout(() => section.classList.add('visible'), index * 100);
            });
        }, 100);
    }

    createAlumniSection(title, members) {
        return `
            <div class="alumni-section animate-fade-in">
                <h3 class="alumni-section-title">${title}</h3>
                <div class="alumni-list">
                    ${members.map(member => `
                        <div class="alumni-item">
                            <div class="alumni-name">${member.name}</div>
                            <div class="alumni-years">${member.years}</div>
                            ${member.currentPosition ? `<div class="alumni-position">${member.currentPosition}</div>` : ''}
                            ${member.institution ? `<div class="alumni-institution">${member.institution}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    showError(message) {
        document.getElementById('piContainer').innerHTML = `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MembersManager();
});

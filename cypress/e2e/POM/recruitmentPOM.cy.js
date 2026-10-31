import halamanLogin from '../../support/loginPage';
import loginData from '../../fixtures/loginData.json';
import halamanRecruitment from '../../support/recruitmentPage';
import recruitmentData from '../../fixtures/recruitmentData.json';
import recruitmentPage from '../../support/recruitmentPage';

describe ('Directory POM', () => {

    beforeEach(function () {
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();
    });

    it('TC-01 - Membuka menu Requirement', () => {        
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC').as('bukaRecruitment');
        halamanRecruitment.bukaHalamanReqruitment();
        cy.wait('@bukaRecruitment').its('response.statusCode').should('eq',200);

        halamanRecruitment.judulHalamanRecruitment().should('contain.text', 'Recruitment');
    });

    it('TC-02 - Menampilkan daftar candidate', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates').as('candidateList');

        halamanRecruitment.bukaHalamanReqruitment();
        
        cy.wait('@candidateList').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('data');
        });

        recruitmentPage.candidateRows().should('exist');
    });

    it('TC-03 - Pencarian dengan nama', () => {
        cy.intercept('GET','**/api/v2/recruitment/candidates*').as('validNameSearch');

        halamanRecruitment.bukaHalamanReqruitment();
        recruitmentPage.pilihCandidateName(recruitmentData.existingCandidate);
        halamanRecruitment.klikTombolSearch();

        cy.wait('@validNameSearch').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it('TC-04 - Pencarian kandidat yang tidak tersedia', () => {
        cy.intercept('GET','**/api/v2/recruitment/candidates*').as('notExistCandidate');

        halamanRecruitment.bukaHalamanReqruitment();
        recruitmentPage.pilihCandidateName(recruitmentData.nonExistingCandidate);
        halamanRecruitment.klikTombolSearch();
        
        cy.wait('@notExistCandidate').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
        });
    });

    it('TC-05 - Pencarian dengan status', () => {
        cy.intercept('GET','**/api/v2/recruitment/candidates*').as('statusSearch');

        halamanRecruitment.bukaHalamanReqruitment();
        recruitmentPage.pilihStatus(recruitmentData.status);
        halamanRecruitment.klikTombolSearch();
        
        cy.wait('@statusSearch').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
        });
    });

    it('TC-06 - Membuka halaman tambah kandidat', () => {
        halamanRecruitment.bukaHalamanReqruitment();
        recruitmentPage.klikTombolTambahKandidat();
        
        cy.contains('h6', 'Add Candidate').should('be.visible');

        recruitmentPage.inputFirstName().should('be.visible');
        recruitmentPage.inputLastName().should('be.visible');
    });

    it('TC-07 - Menambahkan kandidat dengan data valid', () => {
        cy.intercept('GET','**/api/v2/recruitment/candidates').as('createCandidate');

        halamanRecruitment.bukaHalamanReqruitment();
        recruitmentPage.klikTombolTambahKandidat();
        recruitmentPage.fillCandidateForm(recruitmentData.firstName, recruitmentData.middleName, recruitmentData.lastName, recruitmentData.email);
        recruitmentPage.klikTombolSimpan();
        
        cy.wait('@createCandidate').then(({ response }) => {
            expect(request.body).to.have.property('firstName');
            expect(request.body.firstName).to.equal(
                this.recruitmentData.candidate.firstName
            );
            expect(response.statusCode).to.be.oneOf([200, 201]);
        });
    });

    it('TC-08 - Reset filter pencarian', () => {
        halamanRecruitment.bukaHalamanReqruitment();
        recruitmentPage.klikTombolTambahKandidat();
        recruitmentPage.klikTombolCancel();
        
        cy.url().should('include', '/recruitment/viewCandidates');
        recruitmentPage.pageTitle().should('contain', 'Recruitment');
    });
});
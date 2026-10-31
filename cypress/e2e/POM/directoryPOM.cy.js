import halamanLogin from '../../support/loginPage';
import loginData from '../../fixtures/loginData.json';
import halamanDirectory from '../../support/directoryPage';
import directoryData from '../../fixtures/directoryData.json';
import directoryPage from '../../support/directoryPage';

describe ('Directory POM', () => {

    beforeEach(function () {
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();
    });

    it('TC-01 - Membuka menu Directory', () => {        
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory').as('bukaDirectory');
        halamanDirectory.bukaHalamanDirectory();
        cy.wait('@bukaDirectory').its('response.statusCode').should('eq',200);

        halamanDirectory.judulHalamanDirectory().should('contain.text', 'Directory');
    });

    it('TC-02 - Search dengan employee name, job title, dan location kosong', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0').as('defaultSearch');
        halamanDirectory.bukaHalamanDirectory();
        cy.wait('@defaultSearch').its('response.statusCode').should('eq',200);
    });

    it('TC-03 - Pencarian dengan nama terisi, job title dan location kosong', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Rebecca').as('employeeNameSearch');

        halamanDirectory.bukaHalamanDirectory();
        halamanDirectory.pilihEmployeeName(directoryData.existingEmployeeName);
        halamanDirectory.klikTombolSearch();
        
        cy.wait('@employeeNameSearch').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('data');
        });
    });

    it('TC-04 - Pencarian dengan job title terisi, nama dan location kosong', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&jobTitleId=9').as('jobTitleSearch');

        halamanDirectory.bukaHalamanDirectory();
        halamanDirectory.pilihJobTitle(directoryData.jobTitleExist);
        halamanDirectory.klikTombolSearch();
        
        cy.wait('@jobTitleSearch').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('data');
        });
    });

    it('TC-05 - Pencarian dengan location terisi, nama dan job title kosong', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=5').as('locationSearch');

        halamanDirectory.bukaHalamanDirectory();
        halamanDirectory.pilihLocation(directoryData.locationExist);
        halamanDirectory.klikTombolSearch();
        
        cy.wait('@locationSearch').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('data');
        });
    });

    it('TC-06 - Pencarian menggunakan nama yang tidak terdaftar di sistem', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Hana+Nurkarimah').as('notExistEmployeeName');

        halamanDirectory.bukaHalamanDirectory();
        halamanDirectory.pilihEmployeeName(directoryData.nonExistingEmployeeName);
        halamanDirectory.klikTombolSearch();
        
        cy.wait('@notExistEmployeeName').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
        });

        directoryPage.pesanTidakAdaData().should('be.visible');
    });

    it('TC-07 - Reset filter pencarian', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0').as('resetFilterSearch');

        halamanDirectory.bukaHalamanDirectory();
        halamanDirectory.pilihEmployeeName(directoryData.nonExistingEmployeeName);
        halamanDirectory.klikTombolSearch();
        halamanDirectory.klikTombolReset();
        
        cy.wait('@resetFilterSearch').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
        });
    });

    it('TC-08 - Menampilkan daftar keryawan', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0').as('employeeList');

        halamanDirectory.bukaHalamanDirectory();
        
        cy.wait('@employeeList').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('data');
        });

        directoryPage.tampilCardKaryawan().should('exist');
    });
});
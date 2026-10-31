class halamanRecruitment{
    bukaHalamanReqruitment(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    }

    inputCandidateName(){
        return cy.get('.oxd-form .oxd-autocomplete-text-input input').first();
    }

    dropdownVacancy(){
        return cy.get('.oxd-form .oxd-select-text').eq(0);
    }

    dropdownStatus(){
        return cy.get('.oxd-form .oxd-select-text').eq(1);
    }

    pesanInvalidCredentials(){
        return cy.get('.oxd-alert-content-text');
    }

    klikTombolSearch(){
        cy.get('button[type="submit"]').click();
    }

    klikTombolReset(){
        cy.get('button[type="reset"]').click();
    }

    klikTombolTambahKandidat(){
        cy.get('button[type="Add"]').click();
    }

    tampilCardKaryawan(){
        return cy.get('.orangehrm-directory-card');
    }

    pesanTidakAdaData(){
        return cy.get('.oxd-input-field-error-message').should('be.visible').and('contain', 'Invalid');
    }

    judulHalamanRecruitment(){
        return cy.get('.oxd-topbar-header-title');
    }

    pilihEmployeeName(employeeName){
        this.inputEmployeeName().clear();
        if (employeeName) {
            this.inputEmployeeName().type(employeeName);
        }
    }

    pilihJobTitle(jobTitle){
        this.dropdownJobTitle().click();
        cy.contains('.oxd-select-option', jobTitle).click();
    }

    pilihLocation(location){
        this.dropdownLocation().click();
        cy.contains('.oxd-select-option', location).click();
    }
}

export default new halamanDirectory();
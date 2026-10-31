class halamanDirectory{
    bukaHalamanDirectory(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    }

    inputEmployeeName(){
        return cy.get('.oxd-form .oxd-autocomplete-text-input input').first();
    }

    dropdownJobTitle(){
        return cy.get('.oxd-form .oxd-select-text').eq(0);
    }

    dropdownLocation(){
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

    tampilCardKaryawan(){
        return cy.get('.orangehrm-directory-card');
    }

    pesanTidakAdaData(){
        return cy.get('.oxd-input-field-error-message').should('be.visible').and('contain', 'Invalid');
    }

    judulHalamanDirectory(){
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
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
        cy.contains('button', 'Reset').click();
    }

    inputFirstName() {
        return cy.get('input[name="firstName"]');
    }

    inputMiddleName() {
        return cy.get('input[name="middleName"]');
    }

    inputLastName() {
        return cy.get('input[name="lastName"]');
    }

    inputEmail() {
        return cy.get('.oxd-form-row input[placeholder="Type here"]').filter(':visible').last();
    }

    klikTombolSimpan(){
        cy.get('button[type="Save"]').click();
    }

    cancelButton() {
        return cy.contains('.oxd-button', 'Cancel');
    }
    
    klikTombolCancel(){
        this.cancelButton().should('be.visible').click();
    }

    pesanTidakAdaData(){
        return cy.get('.oxd-input-field-error-message').should('be.visible').and('contain', 'Invalid');
    }

    pesanRequired(){
        return cy.get('.oxd-input-field-error-message');
    }

    candidateRows() {
        return cy.get('.oxd-table-body .oxd-table-card');
    }

    judulHalamanRecruitment(){
        return cy.get('.oxd-topbar-header-title');
    }

    pilihCandidateName(candidateName){
        this.inputCandidateName().clear();
        if (candidateName) {
            this.inputCandidateName().type(candidateName);
        }
    }

    pilihVacancy(vacancy){
        this.dropdownVacancy().click();
        cy.contains('.oxd-select-option', vacancy).click();
    }

    pilihStatus(statusCandidate){
        this.dropdownStatus().click();
        cy.contains('.oxd-select-text-input', statusCandidate).click();
    }

    fillCandidateForm(firstName, middleName, lastName, email){
        cy.get('input[name="firstName"]').type(firstName);
        //firstNameInput().type(firstName);
        if (middleName) {
            cy.get('input[name="middleName"]').type(middleName);
        }
        cy.get('input[name="lastName"]').type(lastName);
        cy.get('input[name="email"]').type(email);
    }
}

export default new halamanRecruitment();
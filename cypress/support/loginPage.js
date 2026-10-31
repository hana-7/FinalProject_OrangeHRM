class halamanLogin{
    bukaHalaman(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    inputUsername(username){
        cy.get('input[name="username"]').type(username);
    }

    inputPassword(password){
        cy.get('input[name="password"]').type(password);
    }

    klikTombolLogin(){
        cy.get('button[type="submit"]').click();
    }

    pesanInvalidCredentials(){
        return cy.get('.oxd-alert-content-text');
    }

    pesanRequired(){
        return cy.get('.oxd-input-field-error-message');
    }

    judulDashboard(){
        return cy.get('.oxd-topbar-header-title');
    }

    judulResetPasswordTitle() {
        return cy.contains('Reset Password');
    }

    klikForgotPassword(){
        cy.contains('Forgot your password?').click();
    }

    judulResetPassword(){
        return cy.contains('h6', 'Reset Password');
    }
}

export default new halamanLogin();
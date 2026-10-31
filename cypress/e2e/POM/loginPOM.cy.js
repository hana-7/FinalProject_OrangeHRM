import halamanLogin from '../../support/loginPage';
import loginData from '../../fixtures/loginData.json';
import loginPage from '../../support/loginPage';

describe ('Login POM', () => {
    it('TC-01 - Login dengan username dan password kosong', () => {
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('emptyLogin');

        halamanLogin.bukaHalaman();
        halamanLogin.klikTombolLogin();
        halamanLogin.pesanRequired().should('have.length', 2);

        cy.get('@emptyLogin.all').should('have.length', 0);
        cy.url().should('include', '/auth/login');
    });

    it('TC-02 - Login menggunakan username dan password yang benar', () => {
        cy.intercept('POST', '**/auth/validate').as('loginValid');

        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();

        cy.wait('@loginValid').then(({ response }) => {
            expect(response).to.exist;
            expect(response.statusCode).to.be.oneOf([200, 302]);
        });

        cy.url().should('include', '/dashboard');
        halamanLogin.judulDashboard().should('contain.text', 'Dashboard')
    });

    it('TC-03 - Login menggunakan username yang benar dan password yang salah', () => {
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('wrongPassword');

        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.inputPassword(loginData.passwordInvalid);
        halamanLogin.klikTombolLogin();

        cy.wait('@wrongPassword');
        halamanLogin.pesanInvalidCredentials().should('be.visible').and('contain.text', 'Invalid credentials');
    });

    it('TC-04 - Login menggunakan username tidak terdaftar di sistem', () => {
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('wrongUsername');

        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameInvalid);
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();

        cy.wait('@wrongUsername');
        halamanLogin.pesanInvalidCredentials().should('be.visible').and('contain.text', 'Invalid credentials');
    });

    it('TC-05 - Login dengan username kosong dan password diisi', () => {
        cy.intercept('POST', '**/auth/validate').as('emptyUsername');

        halamanLogin.bukaHalaman();
        halamanLogin.inputPassword(loginData.passwordValid);
        halamanLogin.klikTombolLogin();

        halamanLogin.pesanRequired().should('be.visible').and('contain.text', 'Required');
        cy.get('@emptyUsername.all').should('have.length', 0);
    });

    it('TC-06 - Login dengan username diisi dan password kosong', () => {
        cy.intercept('POST', '**/auth/validate').as('emptyPassword');
        
        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameValid);
        halamanLogin.klikTombolLogin();

        halamanLogin.pesanRequired().should('be.visible').and('contain.text', 'Required');
        cy.get('@emptyPassword.all').should('have.length', 0);
    });

    it('TC-07 - Login menggunakan username dan password yang salah', () => {
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('notValidLogin');

        halamanLogin.bukaHalaman();
        halamanLogin.inputUsername(loginData.usernameInvalid);
        halamanLogin.inputPassword(loginData.passwordInvalid);
        halamanLogin.klikTombolLogin();

        cy.wait('@notValidLogin');
        loginPage.pesanInvalidCredentials().should('be.visible').and('contain','Invalid credentials');
    });

    it('TC-08 - Membuka halaman Forgot Password', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('forgotPasswordPage');
        
        halamanLogin.bukaHalaman();
        halamanLogin.klikForgotPassword();

        cy.wait('@forgotPasswordPage');
        cy.url().should('include', '/auth/requestPasswordResetCode');
        halamanLogin.judulResetPassword().should('be.visible');
    });
});
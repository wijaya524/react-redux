/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login Page E2E Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:5173/login');
    cy.get('#email').should('be.visible');
  });

  it('should display login page correctly', () => {
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button').contains('Sign In').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('#password').type('password123');
    cy.get('button').contains('Sign In').click();

    cy.on('window:alert', (str) => {
      // API Dicoding biasanya mengembalikan "email" is not allowed to be empty
      expect(str).to.contain('email');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('#email').type('aryansyah@gmail.com');
    cy.get('button').contains('Sign In').click();

    cy.on('window:alert', (str) => {
      // Pastikan pesan yang muncul mengandung kata "password"
      expect(str).to.contain('password');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('#email').type('email_salah@gmail.com');
    cy.get('#password').type('password_salah');
    cy.get('button').contains('Sign In').click();

    cy.on('window:alert', (str) => {
      // Pesan standar API: "email or password is wrong"
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // Gunakan akun yang sudah terdaftar di API
    cy.get('#email').type('asadhled@gmail.com'); 
    cy.get('#password').type('password123');
    cy.get('button').contains('Sign In').click();

    // Verifikasi login berhasil: pindah ke root dan ada elemen dashboard
    cy.url().should('eq', 'http://localhost:5173/');
    // Opsional: cek apakah ada tombol logout atau teks selamat datang
    cy.get('nav').should('be.visible');
  });

});
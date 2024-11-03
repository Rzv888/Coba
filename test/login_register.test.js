const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const { screen, fireEvent } = require("@testing-library/dom");

describe("Login and Register DOM Manipulation Tests", () => {
  let document, container;

  beforeEach(() => {
    // Load HTML dan JavaScript ke dalam DOM menggunakan JSDOM
    const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
    const dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    container = document.getElementById("container");

    // Mocking DOM Elements
    global.document = document;
    global.window = dom.window;
    require("./login_register.js"); // Load the JS file after setting up DOM
  });

  afterEach(() => {
    jest.resetModules(); // Reset modules after each test
  });

  test("Clicking signUpButton activates the right panel", () => {
    const signUpButton = document.getElementById("signUp");
    const signContainer = document.querySelector(".sign-in-container");
    const overlayContainer = document.querySelector(".overlay-container");

    fireEvent.click(signUpButton);
    
    expect(container.classList.contains("right-panel-active")).toBe(true);
    expect(document.title).toBe("Sign Up");
    expect(signContainer.style.display).toBe("none");
    expect(overlayContainer.style.display).toBe("none");
  });

  test("Clicking signInButton deactivates the right panel", () => {
    const signInButton = document.getElementById("signIn");
    const signContainer = document.querySelector(".sign-in-container");
    const overlayContainer = document.querySelector(".overlay-container");

    fireEvent.click(signInButton);

    expect(container.classList.contains("right-panel-active")).toBe(false);
    expect(document.title).toBe("Login");
    expect(signContainer.style.display).toBe("block");
    expect(overlayContainer.style.display).toBe("block");
  });

  test("Selecting Fakultas updates Prodi options", () => {
    const fakultasSelect = document.getElementById("fakultas");
    const prodiSelect = document.getElementById("prodi");

    fireEvent.change(fakultasSelect, { target: { value: "Fakultas Informatika" } });
    
    expect(prodiSelect.options[1].value).toBe("Informatika");
    expect(prodiSelect.options[2].value).toBe("Rekayasa Perangkat Lunak");
    expect(prodiSelect.options[3].value).toBe("Teknologi Informasi");
    expect(prodiSelect.options[4].value).toBe("Data Science");
  });

  test("Form validation rules for login form", () => {
    const form = document.querySelector("form[action='/login']");
    const emailInput = form.querySelector("input[name='email']");
    const passwordInput = form.querySelector("input[name='password']");

    emailInput.value = ""; // Set invalid email
    passwordInput.value = ""; // Set empty password

    fireEvent.submit(form);

    expect(emailInput.validationMessage).toBe("Please enter your email address");
    expect(passwordInput.validationMessage).toBe("Please enter your password");
  });
});

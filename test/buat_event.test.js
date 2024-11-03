// test/buat_event.test.js
const { JSDOM } = require("jsdom");
const { fireEvent } = require("@testing-library/dom");

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Buat Event</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      />
  </head>
  <body>
    <div class="container">
      <h1>Buat Event</h1>
      <form method="post" action="/buat-event">
        <div class="mb-3">
          <label for="nama-event" class="form-label">Nama Event</label>
          <input required type="text" class="form-control" id="nama-event" name="nama_event" placeholder="Contoh: Kajian Milenial" />
        </div>
        <div class="mb-3">
          <label for="deskripsi-event" class="form-label">Deskripsi Event</label>
          <textarea required class="form-control" id="deskripsi-event" name="deskripsi_event" rows="3" placeholder="Contoh: Kajian Milenial merupakan..."></textarea>
        </div>
        <div class="mb-3">
          <label for="penyelenggara-event" class="form-label">Penyelenggara Event</label>
          <input required type="text" class="form-control" name="penyelenggara_event" id="penyelenggara-event" placeholder="Contoh: HMRPL/Ditmawa Tel-U" />
        </div>
        <div class="mb-3">
          <label for="divisi-event" class="form-label">Divisi Yang Dibutuhkan</label>
          <label><input type="checkbox" name="divisi[]" value="Acara"> Divisi Acara</label>
          <label><input type="checkbox" name="divisi[]" value="Media"> Divisi Media</label>
          <label><input type="checkbox" name="divisi[]" value="Logistik"> Divisi Logistik</label>
          <label><input type="checkbox" name="divisi[]" value="Dekorasi"> Divisi Dekorasi</label>
          <label><input type="checkbox" name="divisi[]" value="Inti"> Divisi Inti</label>
        </div>
        <div class="mb-3">
          <label for="benefit-event" class="form-label">Benefit Mengikuti Event</label>
          <textarea class="form-control" id="benefit-event" name="benefit_event" rows="3" placeholder="Contoh: - Mendapat Relasi"></textarea>
        </div>
        <div class="mb-3">
          <label for="kepanitiaan-mulai" class="form-label">Waktu kepanitiaan Mulai</label>
          <input required type="datetime-local" class="form-control" id="kepanitiaan-mulai" name="kepanitiaan_mulai" />
        </div>
        <div class="mb-3">
          <label for="kepanitiaan-selesai" class="form-label">Waktu kepanitiaan Selesai</label>
          <input required type="datetime-local" class="form-control" id="kepanitiaan-selesai" name="kepanitiaan_selesai" />
        </div>
        <div class="mb-3">
          <label for="event-mulai" class="form-label">Waktu Event Mulai</label>
          <input required type="datetime-local" class="form-control" id="event-mulai" name="event_mulai" />
        </div>
        <div class="mb-3">
          <label for="event-selesai" class="form-label">Waktu Event Selesai</label>
          <input required type="datetime-local" class="form-control" id="event-selesai" name="event_selesai" />
        </div>
        <button class="btn btn-primary" type="submit">Buat Event</button>
      </form>
    </div>
  </body>
  </html>
`);

// Set global document dan window
global.document = dom.window.document;
global.window = dom.window;

describe("Buat Event Form Tests", () => {
  
  test("should render form fields", () => {
    const namaEventInput = document.getElementById("nama-event");
    const deskripsiEventTextarea = document.getElementById("deskripsi-event");
    const penyelenggaraEventInput = document.getElementById("penyelenggara-event");

    expect(namaEventInput).toBeTruthy();
    expect(deskripsiEventTextarea).toBeTruthy();
    expect(penyelenggaraEventInput).toBeTruthy();
  });

  test("should require nama event", () => {
    const namaEventInput = document.getElementById("nama-event");
    const submitButton = document.querySelector("button[type='submit']");
  
    // Reset input value
    namaEventInput.value = ""; // Kosongkan input untuk memicu validasi
  
    fireEvent.click(submitButton);
  
    // Periksa apakah validitasnya salah
    expect(namaEventInput.validity.valid).toBe(false);
  
    // Cek apakah validasi aktif
    expect(namaEventInput.checkValidity()).toBe(false);
  });
  
  

  test("should accept valid inputs", () => {
    const namaEventInput = document.getElementById("nama-event");
    const deskripsiEventTextarea = document.getElementById("deskripsi-event");
    const penyelenggaraEventInput = document.getElementById("penyelenggara-event");

    namaEventInput.value = "Kajian Milenial";
    deskripsiEventTextarea.value = "Kajian Milenial merupakan...";
    penyelenggaraEventInput.value = "HMRPL/Ditmawa Tel-U";

    const submitButton = document.querySelector("button[type='submit']");
    fireEvent.click(submitButton);

    expect(namaEventInput.validity.valid).toBe(true);
    expect(deskripsiEventTextarea.validity.valid).toBe(true);
    expect(penyelenggaraEventInput.validity.valid).toBe(true);
  });

  test("should have checkboxes for divisions", () => {
    const divisiAcaraCheckbox = document.querySelector('input[value="Acara"]');
    const divisiMediaCheckbox = document.querySelector('input[value="Media"]');

    expect(divisiAcaraCheckbox).toBeTruthy();
    expect(divisiMediaCheckbox).toBeTruthy();
  });

});

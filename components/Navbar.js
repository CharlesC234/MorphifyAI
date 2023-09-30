import "bootstrap/dist/css/bootstrap.css";

export default function Navbar() {
  return (
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg px-4 py-3">
      <div class="container">
        <a class="navbar-brand fw-bold" style={{ fontSize: 27.5 }} href="/">
          stunner.club
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mt-0 mb-lg-0 ms-5">
            <li class="nav-item px-2">
              <a class="nav-link active fw-bold" aria-current="page" href="#">
                Explore
              </a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link fw-bold" aria-current="page" href="/models">
                Models
              </a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link fw-bold" href="#">
                Enter Email
              </a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link fw-bold" href="#">
                Legal
              </a>
            </li>
          </ul>
            <input
              class="form-control ps-4 py-2 fs-7"
              type="search"
              placeholder="Find models"
              aria-label="Search"
              style={{
                borderRadius: 20,
                fontWeight: '600',
                width: '40%',
                color: '#ffffff',
                backgroundColor: "rgba(255, 255, 255, .1)",
                borderColor: "rgba(255, 255, 255, .15)",
                borderWidth: 2,
              }}
            />
        </div>
      </div>
    </nav>
  );
}

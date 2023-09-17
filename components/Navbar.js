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
                Sign In
              </a>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-3 ps-3"
              type="search"
              placeholder="Find models"
              aria-label="Search"
              style={{
                borderRadius: 20,
                width: 375,
                backgroundColor: "rgba(255, 255, 255, .1)",
                borderColor: "rgba(255, 255, 255, .15)",
                borderWidth: 2,
              }}
            />
            <button
              class="btn btn-outline-light"
              style={{ borderRadius: 20, borderWidth: 2 }}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

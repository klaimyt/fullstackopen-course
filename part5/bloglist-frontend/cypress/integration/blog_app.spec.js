Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", (blog) => {
  const { token } = JSON.parse(localStorage.getItem("loggedUser"));
  cy.request({
    method: "POST",
    url: "http://localhost:3003/api/blogs",
    headers: { "Authorization": `bearer ${token}` },
    body: blog,
  }).then(() => {
    cy.visit("http://localhost:3000");
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const newUser = {
      username: "root",
      name: "root",
      password: "root",
    };

    cy.request("POST", "http://localhost:3003/api/users", newUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get('input[name="Username"]').type("root");
      cy.get('input[name="Password"]').type("root");
      cy.contains("login").click();
      cy.contains("root logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get('input[name="Username"]').type("root32t");
      cy.get('input[name="Password"]').type("12312312412");
      cy.contains("login").click();
      cy.get(".notification")
        .should("contain", "Error to log-in: Invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("When loged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "root" });
    });

    describe("When blog created", function () {
      beforeEach(function () {
        cy.createBlog({ title: "Test title 1", author: "test author", url: "test url", likes: 0 });
        cy.createBlog({ title: "Test title 2", author: "test author", url: "test url", likes: 5 });
        cy.createBlog({ title: "Test title 3", author: "test author", url: "test url", likes: 2 });
      });

      it("can like a blog", function () {
        cy.get('.blog').contains('Test title 1').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('likes 0')
        cy.get('@theBlog').find('button').contains('like').click()
        cy.get('@theBlog').contains('likes 1')
      });

      it('can delete a blog', function() {
        cy.get('.blog').contains('Test title 1').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').find('button').contains('remove').click()
        cy.get('html').should('not.contain', "Test title 1")
      })

      it('Check if blogs in proper oreder by likes', function() {
        cy.get('.blog').find('button').each(($el) => {
          cy.wrap($el).should('contain', 'view').click()
        })
        cy.get('.likes').then($likesEl => {
          const likesText = $likesEl.map((i, $likeEl) => $likeEl.innerText).toArray()
          const likes = likesText.map((likeText) => +likeText.split(" ")[1])
          const sortedLikes = [...likes].sort((a, b) => b - a)
          expect(likes).to.eql(sortedLikes)
        })
      })
    });

    it("can create a new blog", function () {
      cy.contains("create new blog").click();
      cy.get('input[name="title"]').type("Test title");
      cy.get('input[name="author"]').type("Test author");
      cy.get('input[name="url"]').type("Test url");
      cy.get("form").contains("create").click();
      cy.get(".notification")
        .should("contain", "a new blog: Test title by Test author added")
        .and("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".blog").contains("Test title");
    });
  });
});

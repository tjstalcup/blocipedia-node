const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";

const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;


describe("routes : wikis", () => {
  beforeEach(done => {
    this.user;
    this.wiki;
    sequelize.sync({ force: true }).then(res => {
      User.create({
        email: "testuser@gmail.com",
        password: "123456789",
        name: "testuser",
        userId: 1
      })
        .then(user => {
          this.user = user;
  
          Wiki.create({
            title: "Toast",
            body: "Toast is great",
            private: false,
            userId: 1
          })
            .then(wiki => {
              this.wiki = wiki;
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("GET /wikis", () => {
    it("should render the wiki index page", done => {
      request.get(base, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Wikis");
        done();
      });
    });
  });

  describe("GET /wikis/new", () => {
    it("should render a view with a new wiki form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
<<<<<<< HEAD
        expect(body).toContain("Wikis");
=======
        expect(body).toContain("New Wiki");
>>>>>>> 29008e5224b762c7b39b8258eca839d47e210179
        done();
      });
    });
  });

  describe("POST /wikis/create", () => {
    it("should create a new wiki and redirect", done => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Blink-182",
          body: "A band from the late 90s to the early 2000s."
        }
      };
      request.post(options, (err, res, body) => {
        Wiki.findOne({ where: { title: "Blink-182" } })
          .then(wiki => {
            expect(res.statusCode).toBe(303);
            expect(wiki.title).toBe("Blink-182");
            expect(wiki.body).toBe("A band from the late 90s to early 2000s.");
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /wikis/:id", () => {
    it("should render a view with the selected wiki", done => {
      request.get(`${base}${this.wiki.id}`, (err, res, body) => {
        expect(err).toBeNull();
<<<<<<< HEAD
        expect(body).toContain("Toast is great");
=======
        expect(body).toContain("Toast");
>>>>>>> 29008e5224b762c7b39b8258eca839d47e210179
        done();
      });
    });
  });

  describe("POST /wikis/:id/destroy", () => {
    it("should delete the wiki with the associated ID", done => {
      Wiki.findAll().then(wikis => {
        const wikiCountBeforeDelete = wikis.length;
        expect(wikiCountBeforeDelete).toBe(1);
        request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
          Wiki.findAll()
            .then(wikis => {
              expect(err).toBeNull();
              expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });
  });

});
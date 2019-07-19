const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";

const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;


describe("routes : wikis", () => {
  beforeEach((done) => {
    this.wiki;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "test@example.com",
        password: "testing",
        name: "Test User"
     })
     .then((user) => {
       this.user = user;
       Wiki.create({
        title: "Toast",
        body: "Toast is great",
        private: false,
        userId: user.id
       })
       .then((wiki) => {
         this.wiki = wiki;
         done();
       })
     })
   });
  });

  beforeEach((done) => {
    User.create({
      email: "admin@example.com",
      password: "123456",
      role: "admin"
    })
    .then((user) => {
      request.get({         // mock authentication
        url: "http://localhost:3000/auth/fake",
        form: {
          role: user.role,     // mock authenticate as admin user
          userId: user.id,
          email: user.email
        }
      },
        (err, res, body) => {
          done();
        }
      );
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
        expect(body).toContain("New Wiki");
        done();
      });
    });
  });

  describe("POST /wikis/create", () => {
    it("should create a new public wiki, and redirect", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Jellyfishing",
          body: "Beware the stings!",
          userId: this.user.id
        }
      };
      request.post(options, (err, res, body) => {
        Wiki.findOne({where: {title: "Jellyfishing"}})
        .then((wiki) => {

          expect(err).toBeNull();
          expect(wiki.title).toBe("Jellyfishing");
          expect(wiki.body).toBe("Beware the stings!");
          done();
        })
      });
    });
  });


  describe("GET /wikis/:id", () => {
    it("should render a view with the selected wiki", done => {
      request.get(`${base}${this.wiki.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Toast");
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

  describe("GET /wikis/:id/edit", () => {

    it("should render a view with an edit wiki form", (done) => {
      request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Wiki");
        done();
      });
    });
  });

  describe("POST /wikis/:id/update", () => {

    it("should update the wiki with the given values", (done) => {
       const options = {
          url: `${base}${this.wiki.id}/update`,
          form: {
            title: "Toast",
            body: "Toast is decent"
          }
        };

        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();

          Wiki.findOne({
            where: { id: this.wiki.id }
          })
          .then((wiki) => {
            expect(wiki.title).toBe("Toast");
            expect(wiki.body).toBe("Toast is decent");
            done();
          });
        });
    });

  });

});
const request = require("supertest");

const app = require("./index");

describe("create user", () => {
    // valid signUp
    jest.setTimeout(10000)
    test("POST /guest/sign-up", (done) => {
      request(app)
        .post("/guest/sign-up")
        .expect("Content-Type", /json/)
        .send(
            {
                "userName":"ssksoraka",
                "password":"www",
                "firstName":"Mahmoud",
                "lastName":"Abdelkhaleq",
                "gender":"male",
                "country":"Egypt",
                "telephoneNumber": "01122313",
                "passportNumber": "123",
                "email":"yassssuo@gmail.com"
            }
        )
        .expect(200)
        .expect((res) => {
         // res.body.data.length = 1;
          res.body.message = "Success";
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
    // invalid signUp
    test("POST /guest/sign-up", (done) => {
        request(app)
          .post("/guest/sign-up")
          .expect("Content-Type", /json/)
          .send(
              {
                  "userName":"soraka",
                  "password":"www",
                  "firstName":"Mahmoud",
                  "lastName":"Abdelkhaleq",
                  "gender":"male",
                  "country":"Egypt",
                  "telephoneNumber": "01122313",
                  "passportNumber": "123",
                  "email":"yasuo@gmail.com"
              }
          )
          .expect(200)
          .expect((res) => {
            //res.body.data.length = 1;
            res.body.message = "Username or email has already been taken";
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
      // valid login
    test("POST /user/login", (done) => {
        request(app)
          .post("/user/login")
          .expect("Content-Type", /json/)
          .send(
              {
                  "userName":"soraka",
                  "password":"www"
              }
          )
          .expect(200)
          .expect((res) => {
            //res.body.data.length = 1;
            res.body.message = "Success";
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
      //Invalid login
      test("POST /user/login", (done) => {
        request(app)
          .post("/user/login")
          .expect("Content-Type", /json/)
          .send(
              {
                  "userName":"sossraka",
                  "password":"www"
              }
          )
          .expect(200)
          .expect((res) => {
            //res.body.data.length = 1;
            res.body.message = "Invalid Username or Password";
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });

      // valid edit password
      // test("POST /user/updateSensitiveUserInfo", (done) => {
      //   request(app)
      //     .post("/user/updateSensitiveUserInfo")
      //     .expect("Content-Type", /json/)
      //     .send(
      //         {
      //             "userName":"mad",
      //             "password":"123",
      //             "update":{
      //               "password": "123",
      //               "email": "medo@mshakel.com"
      //           }
      //         }
      //     )
      //     .expect(200)
      //     .expect((res) => {
      //       //res.body.data.length = 1;
      //       res.body.data[0] = "User updated";
      //     })
      //     .end((err, res) => {
      //       if (err) return done(err);
      //       return done();
      //     });
      // });

    // More things come here
  });
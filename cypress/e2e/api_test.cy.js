// API Test for https://reqres.in/ to Create, Read, Update and Delete Users data

describe('CRUD Users API Tests for ', () => {
  it('should create a new user', () => {
    const user = {
      name: 'Wahyu',
      job: 'QA Engineer'
    };

    cy.request('POST', 'https://reqres.in/api/users', user)
      .then((response) => {
        expect(response.status).to.eq(201); // Asserting the status code
        expect(response.body).to.have.property('name', user.name); // Asserting the response body
        expect(response.body).to.have.property('job', user.job);
      });
  });

  it('should retrieve a user', () => {
    cy.request('GET', 'https://reqres.in/api/users/2')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(2);
      });
  });

  it('should update a user', () => {
    const updatedUser = {
      name: 'Wahyu Maulana',
      job: 'Senior QA Engineer'
    };

    cy.request('PUT', 'https://reqres.in/api/users/2', updatedUser)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', updatedUser.name);
        expect(response.body).to.have.property('job', updatedUser.job);
      });
  });

  it('should delete a user', () => {
    cy.request('DELETE', 'https://reqres.in/api/users/2')
      .then((response) => {
        expect(response.status).to.eq(204);
      });
  });
});

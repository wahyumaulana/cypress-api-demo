// API Test for https://reqres.in/ to Create, Read, Update and Delete Users data

describe('Create Read Update and Delete Users API', () => {

  let userId;

  it('should retrieve a single user with id 2', () => {
    cy.fixture('single_user.json').then((user) => {
      cy.request('GET', 'https://reqres.in/api/users/2')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.deep.equal(user.data);
        });
    });
  });

  it('should create a new user', () => {

    cy.fixture('user').then((user) => {
    cy.request('POST', 'https://reqres.in/api/users', user)
      .then((response) => {
        expect(response.status).to.eq(201); // Asserting the status code
        expect(response.body).to.have.property('createdAt').that.is.a('string');
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('name', user.name); 
        expect(response.body).to.have.property('job', user.job);

        userId = response.body.id;
      });
    });

  });

  it('should update a user', () => {
    const updatedUser = {
      name: 'Wahyu Maulana',
      job: 'Senior QA Engineer'
    };

    cy.request('PATCH', `https://reqres.in/api/users/${userId}`, updatedUser)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', updatedUser.name);
        expect(response.body).to.have.property('job', updatedUser.job);
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
      });
  });

  it('should delete a user', () => {
    cy.request('DELETE', `https://reqres.in/api/users/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(204);
      });
  });
});

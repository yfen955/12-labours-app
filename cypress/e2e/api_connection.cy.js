describe('test api conntection', () =>{
  it('POST: dataset & models metadata', () => {
    cy.visit('/data/browser/dataset/dataset-102-version-4?datasetTab=gallery');
    cy.request({
      method: "POST",
      url: `${Cypress.env('query_url')}/graphql/query`,
      body: {
        node: 'experiment_query',
        filter: {
          submitter_id: ['dataset-102-version-4']
        }
      }
    }).then(function(res) {
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0].id).to.equal("11a285ec-f063-4092-9c99-59f4a35e7bc1");
      expect(res.body[0]).to.have.property('scaffoldViews');
      expect(res.body[0].scaffoldViews[0].filename).to.equal("derivative/pig_heart_Layout1_view.json");
    })
  })
  
  it('GET: citation', () => {
    cy.visit('/data/browser/dataset/1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538?datasetTab=cite');
    cy.request({
      method: "GET",
      url: 'https://doi.org/10.1038/s41416-018-0185-8',
      headers: {
        "Accept": "text/x-bibliography; style=apa"
      }
    }).then(function(res) {
      expect(res.body).to.equal("Saha, A., Harowicz, M. R., Grimm, L. J., Kim, C. E., Ghate, S. V., Walsh, R., & Mazurowski, M. A. (2018). A machine learning approach to radiogenomics of breast cancer: a study of 922 subjects and 529 DCE-MRI features. British Journal of Cancer, 119(4), 508–516. https://doi.org/10.1038/s41416-018-0185-8\n");
    })
  })
})
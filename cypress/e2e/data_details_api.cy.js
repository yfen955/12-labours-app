describe('test components that uses api', () =>{
  it('test dataset & thumbnail metadata', () => {
    // dataset metadata
    cy.fixture('datasetMetadata.json').as('dataset');
    cy.get('@dataset').then((dataset) => {
      cy.intercept({
        method: 'POST', 
        url: 'http://localhost:8000/graphql/query',
        times: 1
      }, (req) => {
        expect(req.body.node).to.include('dataset_description');
        req.reply(dataset);
      }).as('getDataset');
    });

    // three citations
    cy.intercept({
      method: 'GET',
      url: 'https://doi.org/10.7937/TCIA.e3sv-re93',
      headers: {
        'Accept': 'text/x-bibliography; style=apa',
      },
    }, {
      statusCode: 200,
      body: 'Saha, A., Harowicz, M. R., Grimm, L. J., Weng, J., Cain, E. H., Kim, C. E., Ghate, S. V., Walsh, R., &amp; Mazurowski, M. A. (2021). <i>Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations</i> (Version 3) [Data set]. The Cancer Imaging Archive. https://doi.org/10.7937/TCIA.E3SV-RE93'
    });
    cy.intercept({
      method: 'GET',
      url: 'https://doi.org/10.1038/s41416-018-0185-8',
      headers: {
        'Accept': 'text/x-bibliography; style=apa',
      },
    }, {
      statusCode: 200,
      body: 'Saha, A., Harowicz, M. R., Grimm, L. J., Kim, C. E., Ghate, S. V., Walsh, R., & Mazurowski, M. A. (2018). A machine learning approach to radiogenomics of breast cancer: a study of 922 subjects and 529 DCE-MRI features. British Journal of Cancer, 119(4), 508–516. https://doi.org/10.1038/s41416-018-0185-8'
    });
    cy.intercept({
      method: 'GET',
      url: 'https://doi.org/10.1007/s10278-013-9622-7',
      headers: {
        'Accept': 'text/x-bibliography; style=apa',
      },
    }, {
      statusCode: 200,
      body: 'Clark, K., Vendt, B., Smith, K., Freymann, J., Kirby, J., Koppel, P., Moore, S., Phillips, S., Maffitt, D., Pringle, M., Tarbox, L., & Prior, F. (2013). The Cancer Imaging Archive (TCIA): Maintaining and Operating a Public Information Repository. Journal of Digital Imaging, 26(6), 1045–1057. https://doi.org/10.1007/s10278-013-9622-7'
    });

    // returning false here prevents Cypress from failing the test
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes("Data cannot be found in the node"))
        return false
      return true
    });

    cy.visit('/data/browser/dataset/1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538?datasetTab=cite');
    cy.wait('@getDataset');

    cy.get('.page-title').should('contain', 'DYNAMIC CONTRAST-ENHANCED MAGNETIC...');
    cy.get('h1').should('contain', 'Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)');
    cy.get('span').should('contain', 'Saha Ashirbani');
    cy.get('a').should('contain', 'https://doi.org/10.7937/TCIA.e3sv-re93');
    cy.get('#datasetBrowser').find('span').should('contain', 'Dataset');

    // citation
    cy.get(".citation-content.indent").find('div').should('contain', 'Saha, A., Harowicz, M. R., Grimm, L. J., Kim, C. E., Ghate, S. V., Walsh, R., & Mazurowski, M. A. (2018). A machine learning approach to radiogenomics of breast cancer: a study of 922 subjects and 529 DCE-MRI features. British Journal of Cancer, 119(4), 508–516. https://doi.org/10.1038/s41416-018-0185-8');
  })
})
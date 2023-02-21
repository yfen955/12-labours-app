describe('test api conntection', () =>{
  it('POST: dataset metadata', () => {
    cy.visit('/data/browser/dataset/1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538?datasetTab=gallery');
    cy.request({
      method: "POST",
      url: 'http://localhost:8000/graphql/query',
      body: {
        node: 'dataset_description',
        filter: {
          submitter_id: ['1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538-dataset_description']
        }
      }
    }).then(function(res) {
      expect(res.body[0]).to.have.property('title');
      expect(res.body[0].title[0]).to.equal("Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)");
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
    
  it('POST: scaffold metadata', () => {
    cy.visit('/data/browser/dataset/dataset-102-version-4?datasetTab=gallery');
    cy.request({
      method: "POST",
      url: 'http://localhost:8000/graphql/query',
      body: {
        node: 'manifest',
        filter: {
          additional_types: ["application/x.vnd.abi.scaffold.view+json"]
        }
      }
    }).then(function(res) {
      expect(res.body[0]).to.have.property('filename');
      expect(res.body[0].filename).to.equal("derivative/Scaffolds/sub-all_direct-stim_distal-colon/sub-all_direct-stim_distal-colon_view.json");
    })
  })
})
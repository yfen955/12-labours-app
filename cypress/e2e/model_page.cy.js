describe('map viewer page', () =>{
  it('test scaffold is loaded', () => {
    cy.visit('/data/maps?type=scaffold&id=ecfe1b06-eb33-461e-ad34-92456c8cbfc6&access=demo1-12L');
    cy.wait(15000);
    // box in the bottom left corner
    cy.get('.traditional-container').should('contain', 'Regions');
    // content in the box
    cy.get('.el-tree-node__content').should('contain', 'colon');
    cy.get('.el-popover__reference-wrapper').find('svg');   // icon
    cy.get('canvas');
  })

  it('test flatmap is loaded', () => {
    cy.visit('/data/maps?type=flatmap&id=1&access=demo1-12L');
    cy.wait(10000);
    cy.get('.checkall-display-text').should('contain', 'Pathways');
    cy.get('.label-text').should('contain', 'CNS');
    cy.get('canvas');
  })
})
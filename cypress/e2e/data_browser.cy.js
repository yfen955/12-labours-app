describe('information in the data brower page', () =>{
  beforeEach(function () {
    cy.visit('/data/browser?type=dataset&page=1&limit=10');
  })

  it('click the nav bar', () => {
    cy.contains('Browse categories');
    cy.get("#tab-tools").click();
    cy.url().should('include', '/data/browser?type=tools&page=1&limit=10');
  })

  it('search data & clear search', () => {
    cy.contains('Search within category');
    cy.get('input[placeholder="Enter search criteria"]').type('human');
    cy.get('.el-button.search-btn.el-button--default').click();
    cy.get('a').should('contain', 'Human whole-body scaffold');
    cy.get('a').should('contain', 'Human whole-body with embedded organs using automatic workflow for inserting the organs');
    cy.get('.el-button.clear-search-btn.el-button--default').click();
    cy.contains('15 Results | Showing');
  })

  it('click filter items', () => {
    cy.contains('Refine results');
    // click the checkbox to choose 1 item
    cy.get('.el-collapse-item__header').filter(':contains("SEX")').click();
    cy.get('.el-collapse-item__header.is-active');
    cy.get('span.el-checkbox__label').filter(':contains("Female")').click();
    cy.get('a').should('contain', 'Test case for physiological data visualisation');
    // choose 1 more item in another filter
    cy.get('.el-collapse-item__header').filter(':contains("MIME TYPE")').click();
    cy.get('span.el-checkbox__label').filter(':contains("Scaffold")').click();
    cy.get('p').should('contain', 'No result');
    // change to 'or' relation
    cy.get('.el-switch.is-checked').click();
    cy.contains('12 Results | Showing');
    cy.get('a').should('contain', 'Generic mouse colon scaffold');
    // cancel a facet
    cy.get('.tags.el-tag').filter(':contains("Female")').find('.el-tag__close.el-icon-close').click();
    cy.contains('11 Results | Showing');
    cy.get('a').should('not.have.value', 'Test case for physiological data visualisation');
    // click the checkbox to cancel a item
    cy.get('span.el-checkbox__label').filter(':contains("Scaffold")').click();
    cy.contains('15 Results | Showing');
    // close the filter
    cy.get('.el-collapse-item__header.is-active').filter(':contains("MIME TYPE")').click();
    // if choose all items, checkboxes should all be not checked
    cy.get('.el-checkbox.filter-selector').filter(':contains("Female")').click();
    cy.get('.el-checkbox.filter-selector.is-checked').filter(':contains("Female")');   // the checkbox is checked
    cy.get('.el-checkbox__input.is-indeterminate');   // 'select all' checkbox is indeterminate
    cy.contains('1 Results | Showing');
    cy.get('.el-checkbox.filter-selector').filter(':contains("Male")').click();
    cy.get('.el-checkbox.filter-selector.is-checked').should('have.length', 5);   // only all 'select all' checkboxes are checked
    cy.contains('15 Results | Showing');
  })

  it('dataset card', () => {
    cy.get('.dataset-img').find('img[src="http://localhost:8000/data/preview/dataset-34-version-5/derivative/Scaffolds/sub-all_direct-stim_distal-colon/sub-all_direct-stim_distal-colon_thumbnail.jpg"]');
    cy.contains('Anatomical Structure breast');
    cy.contains('Keywords breast, human');
    cy.contains('Samples 1 samples out of 1 objects');
    cy.get('a[href="/data/browser/dataset/1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538?datasetTab=abstract"]').should('contain', 'Dynamic contrast-enhanced magnetic resonance images of breast cancer patients with tumor locations (Duke-Breast-Cancer-MRI)').click();
    cy.url().should('include', '/data/browser/dataset/1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538?datasetTab=abstract');
  })

  it('Pagination Heading', () => {
    cy.contains('15 Results | Showing');
    // turn page
    cy.get('.pagination-container.top').find('ul.el-pager').children('li.number').filter(':contains("2")').click();
    cy.url().should('include', '/data/browser?type=dataset&page=2&limit=10');
    cy.get('.pagination-container.top').find('ul.el-pager').children('li.number.active').should('contain', '2');
    cy.get('.pagination-container.bottom').find('ul.el-pager').children('li.number.active').should('contain', '2');
    // change page size
    cy.get('.pagination-container.top').find('.filter-dropdown.el-dropdown-link.el-dropdown-selfdefine').click();
    cy.get('ul.el-dropdown-menu.el-popper[x-placement="bottom-start"]').children('li.el-dropdown-menu__item.icon-item').filter(':contains("10")').find('.item-icon-check.svg-icon.svg-fill');   // current is 10
    cy.get('ul.el-dropdown-menu.el-popper[x-placement="bottom-start"]').children('li.el-dropdown-menu__item.icon-item').filter(':contains("20")').click();
    cy.url().should('include', '/data/browser?type=dataset&page=1&limit=20');
    cy.get('.filter-dropdown.el-dropdown-link.el-dropdown-selfdefine').should('contain', '20');   // current is 20
    cy.get('.pagination-container.top').find('ul.el-pager').children('li').should('have.length', 1);
  })
})
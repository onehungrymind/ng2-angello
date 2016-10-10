import { Ng2AngelloPage } from './app.po';

describe('ng2-angello App', function() {
  let page: Ng2AngelloPage;

  beforeEach(() => {
    page = new Ng2AngelloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

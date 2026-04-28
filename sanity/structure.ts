import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Allseeds Turkey Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.documentTypeListItem('siteSettings').title('Settings (EN/TR)'),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('home').title('Home Page'),
      S.documentTypeListItem('activities').title('Activities'),
      S.documentTypeListItem('sustainability').title('Sustainability'),
      S.documentTypeListItem('people').title('People'),
      S.documentTypeListItem('company').title('Company'),
      S.documentTypeListItem('contact').title('Contact'),
    ])

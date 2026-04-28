import { type SchemaTypeDefinition } from 'sanity'
import home from './home'
import activities from './activities'
import sustainability from './sustainability'
import people from './people'
import company from './company'
import contact from './contact'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, activities, sustainability, people, company, contact, siteSettings],
}

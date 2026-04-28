import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "home" && language == $lang][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    aboutTitle,
    aboutText,
    aboutImage,
    statsItems
  }
`

export const activitiesQuery = groq`
  *[_type == "activities" && language == $lang][0] {
    pageTitle,
    pageSubtitle,
    heroImage,
    items[] {
      slug,
      title,
      description,
      image,
      icon
    }
  }
`

export const sustainabilityQuery = groq`
  *[_type == "sustainability" && language == $lang][0] {
    pageTitle,
    pageSubtitle,
    heroImage,
    pillars[] {
      slug,
      title,
      description,
      image,
      icon
    },
    commitmentText
  }
`

export const peopleQuery = groq`
  *[_type == "people" && language == $lang][0] {
    pageTitle,
    pageSubtitle,
    heroImage,
    teamMembers[] {
      name,
      title,
      bio,
      photo,
      email,
      linkedin
    },
    cultureText
  }
`

export const companyQuery = groq`
  *[_type == "company" && language == $lang][0] {
    pageTitle,
    pageSubtitle,
    heroImage,
    aboutText,
    founded,
    keyFigures,
    locations,
    galleryImages
  }
`

export const contactQuery = groq`
  *[_type == "contact" && language == $lang][0] {
    pageTitle,
    pageSubtitle,
    heroImage,
    email,
    phone,
    formTitle,
    contactCategories,
    locations
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && language == $lang][0] {
    siteName,
    siteDescription,
    logo,
    navItems,
    footerTagline,
    footerLinks,
    socialLinks
  }
`

# Empty Threats (e-commerce site)

I am currently building this for a client. The architecture and layout of the site is nearly complete. Currently, I am waiting for the client to populate the CMS and to authorize the stripe account.

### Tech

Next.js web store that fetches content from GraphCMS. Global state is managed by React Context and is used for the cart component.

Stripe checkout is called from Next's api endpoint. A webhook creates an order item for the CMS and updates the availability.

#### Styles made with Tailwind CSS

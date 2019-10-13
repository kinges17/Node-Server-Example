## ORCID API Integration - ideaQuad

## Task

To create an ORCID API integration for the ideaQuad software platform.

### Background Information

ORCID (https://orcid.org/) is an open source initiative that provides researchers with a unique id (e.g. xxxx-xxxx-xxxx-xxxx), to solve the problem that some researchers have the same name and it can become difficult to determine who has published what.

ORCID offers a public open API where it is possible to import or download all data associated with a user's ORCID account. 

There is both a _public api_ and _member api_. The public api has no fee associated with its use, and it should fit our initial needs. This will entail us only running GET / READ requests for the ORCID API in this implementation. 

Introduction to the ORCID API:
https://members.orcid.org/api/about-public-api

Full ORCID API Documentation:
https://members.orcid.org/api

How to READ / GET Data from ORCID API:
https://members.orcid.org/api/tutorial/read-orcid-records?fbclid=IwAR1NOlcxUbaYrtKvtYSytAqIougfVKhTB_TyoU1OjhjjwTKXvVaGToTl5_k

Initially, I would recommend that we download all data that is available from an ORCID user's account, and then as a next step we can prioritize which attributes would be most important or unique for the Research Census part of ideaQuad. This will likely be publication records.

---

**_back-end dev_**

Please create a Node.js server that can successfully communicate with the ORCID API. This uses the token and secret from our ORCID account that has developer access.

**_front-end dev_**

Please create an HTML input field for a user to input their ORCID ID (format xxxx-xxxx-xxxx-xxxx) and an HTML button called 'import' that when clicked sends a GET request to the Node.js server, which then sends a GET request to the ORCID API.

When the Node.js receives a response from the ORCID API, this response should be sent back to the client and can be displayed on the webpage to verify that the API connection was successful.

The final implementation of this will be in React.js, but it can use regular HTML and jQuery to start off if preferred for development / testing.

I would recommend using the Axios library for client-side API calls (https://github.com/axios/axios).

**_data_**

Please retrieve all available data from a ORCID user's profile.

I would recommend we convert this data to JSON format, if it defaults to XML.

**_API Doc_**

This ORCID API doc explains how to write GET requests to interact with the ORCID API.
https://members.orcid.org/api/tutorial/read-orcid-records  

The specific data attributes that are available by ORCID for us to query are outlined in the above link.

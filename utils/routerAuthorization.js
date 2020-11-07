const Roles = require('../models/roles');

module.exports = {
    user: {
        GET: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        POST: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
    },
    blog_menu: {
        POST: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        GET: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
    },
    project: {
        POST: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        PUT: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE: {
            Authorize: [Roles.Root, Roles.Administrator]
        },
    },
    blog: {
        PUT: {
            Individual_Authorize: [Roles.Editor]
        }
    },
    message:{
        GET:{
            Authorize: [Roles.Root, Roles.Administrator]
        },
        DELETE:{
            Authorize: [Roles.Root, Roles.Administrator]
        }
    }
}
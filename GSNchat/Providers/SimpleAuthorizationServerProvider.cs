using GSNchat.Models;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using System.Web.Helpers;
using Microsoft.Owin.Security;

namespace GSNchat
{

    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var orchestrate = new Orchestrate.Net.Orchestrate("0b42c04c-0d70-4da8-a3c1-2036882369d0");
            var result = orchestrate.Search("users", context.UserName, 1);
            
            if (result.Count == 0) {
                       context.SetError("invalid_grant", "The user name or password is incorrect.");
                       return;
            }

            var userResult = result.Results.FirstOrDefault();
            UserModel user = JsonConvert.DeserializeObject<UserModel>(userResult.Value.ToString());

            if (Crypto.VerifyHashedPassword(user.Password, context.Password))
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim("sub", user.UserName));

                if (!String.IsNullOrEmpty(user.Role))
                {
                    identity.AddClaim(new Claim("role", user.Role));
                }
                else {
                    identity.AddClaim(new Claim("role", "User"));
                }

                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { 
                        "role", (!String.IsNullOrEmpty(user.Role)) ? user.Role : "User"
                        
                    },
                    { 
                        "userName", user.UserName
                    }
                });


                var ticket = new AuthenticationTicket(identity, props);

                context.Validated(ticket);
            }
            else {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }
            
            

        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}
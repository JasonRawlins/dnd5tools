using System;
using System.Threading.Tasks;
using Microsoft.Owin.Security.OAuth;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Web.Hosting;
using dnd5tools.Models;
using System.Security.Claims;

namespace dnd5tools.Providers {
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId) {
            if (publicClientId == null) {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context) {
            if (context.ClientId == _publicClientId) {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri) {
                    context.Validated();
                }
                else if (context.ClientId == "web") {
                    var expectedUri = new Uri(context.Request.Uri, "/");
                    context.Validated(expectedUri.AbsoluteUri);
                }
            }

            return Task.FromResult<object>(null);
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context) {

            context.Validated();

            //string clientId;
            //string clientSecret;

            //if (context.TryGetBasicCredentials(out clientId, out clientSecret)) {
            //    UserManager<IdentityUser> userManager = context.OwinContext.GetUserManager<UserManager<IdentityUser>>();

            //    OAuthDbContext dbContext = context.OwinContext.Get<OAuthDbContext>();

            //    try {
            //        Client client = await dbContext
            //            .Clients
            //            .FirstOrDefaultAsync(clientEntity => clientEntity.Id == clientId);

            //        if (client != null &&
            //            userManager.PasswordHasher.VerifyHashedPassword(
            //                client.ClientSecretHash, clientSecret) == PasswordVerificationResult.Success) {
            //            // Client has been verified.
            //            context.OwinContext.Set<Client>("oauth:client", client);
            //            context.Validated(clientId);
            //        }
            //        else {
            //            // Client could not be validated.
            //            context.SetError("invalid_client", "Client credentials are invalid.");
            //            context.Rejected();
            //        }
            //    }
            //    catch {
            //        // Could not get the client through the IClientManager implementation.
            //        context.SetError("server_error");
            //        context.Rejected();
            //    }
            //}
            //else {
            //    // The client credentials could not be retrieved.
            //    context.SetError(
            //        "invalid_client",
            //        "Client credentials could not be retrieved through the Authorization header.");

            //    context.Rejected();
            //}
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context) {

            ApplicationUserManager userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            ApplicationUser user;

            try {
                user = await userManager.FindAsync(context.UserName, context.Password);
            }
            catch {
                // Could not retrieve the user.
                context.SetError("server_error");
                context.Rejected();

                // Return here so that we don't process further. Not ideal but needed to be done here.
                return;
            }

            if (user != null) {
                try {
                    // User is found. Signal this by calling context.Validated
                    ClaimsIdentity identity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ExternalBearer);

                    context.Validated(identity);
                }
                catch {
                    // The ClaimsIdentity could not be created by the UserManager.
                    context.SetError("server_error");
                    context.Rejected();
                }
            }
            else {
                // The resource owner credentials are invalid or resource owner does not exist.
                context.SetError("access_denied", "The resource owner credentials are invalid or resource owner does not exist.");
                context.Rejected();
            }
        }
    }
}
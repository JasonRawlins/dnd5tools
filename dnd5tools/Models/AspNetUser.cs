//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace dnd5tools.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AspNetUser
    {
        public AspNetUser()
        {
            this.Characters = new HashSet<Character>();
            this.Reviews = new HashSet<Review>();
        }
    
        public string Id { get; set; }
        public string UserName { get; set; }
    
        public virtual ICollection<Character> Characters { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}

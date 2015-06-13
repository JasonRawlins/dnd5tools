using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dnd5tools.Models {
    public partial class Review {
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HtmlAgilityPack;

namespace dnd5tools {
    public static class HtmlUtility {
        public static string StripHtmlTags(string content, string[] whitelist) {
            HtmlDocument htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(content);

            var sanitizedContent = "";
            sanitizedContent += SanitizeNode(htmlDocument.DocumentNode, whitelist);

            return sanitizedContent;
        }

        private static string SanitizeNode(HtmlNode htmlNode, string[] whitelist) {
            var content = "";
            for (int i = 0; i < htmlNode.ChildNodes.Count; i++) {
                content += SanitizeNode(htmlNode.ChildNodes[i], whitelist);
            }

            if (htmlNode.NodeType == HtmlNodeType.Text) {
                content += htmlNode.InnerText;
            }
            else if (htmlNode.NodeType == HtmlNodeType.Element && (whitelist == null || whitelist.Contains(htmlNode.Name, StringComparer.OrdinalIgnoreCase))) {
                content += htmlNode.OuterHtml;
            }

            return content;
        }
    }
}
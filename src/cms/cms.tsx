import CMS from "netlify-cms";
import HomePreviewTemplate from "../../src/previews/HomePreviewTemplate";
CMS.registerPreviewTemplate("home", HomePreviewTemplate);
CMS.registerPreviewStyle("./preview_styles.css");

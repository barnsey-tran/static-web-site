import CMS from "netlify-cms";
import HomePreviewTemplate from "../../src/previews/HomePreviewTemplate";
import NewsPreviewTemplate from "../../src/previews/NewsPreviewTemplate";

CMS.registerPreviewStyle("./preview_styles.css");
CMS.registerPreviewTemplate("home", HomePreviewTemplate);
CMS.registerPreviewTemplate("news", NewsPreviewTemplate);
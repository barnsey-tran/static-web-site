import CMS from "netlify-cms";
import FeaturePreviewComponent from "../../src/previews/FeaturePreview";
CMS.registerPreviewTemplate("home", FeaturePreviewComponent);
CMS.registerPreviewStyle("./preview_styles.css");

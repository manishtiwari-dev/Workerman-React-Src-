import "babel-polyfill";
import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Preloader from "./component/Preloader";

import POST from "axios/post";
import { SuperGeneralSettingUrl } from "config/index";
import {
  updateLangState,
  updateSuperSettingState,
} from "redux/slice/loginSlice";
import Pusher from "pusher-js";
import "./App.css";
import ToasterNotify from "component/ToasterNotify";
import { Trans } from "lang";
import { ApiDataProvider } from "component/ApiDataContext";

const SuperAdmin = lazy(() => import("layouts/SuperAdmin"));
const Dashboard = lazy(() => import("pages/dashboard/SalesDashboard"));
const UserDashboard = lazy(() => import("pages/dashboard/UserDashboard"));

const SalesDashboard = lazy(() => import("pages/dashboard/SalesDashboard"));
const AnalTicDashboard = lazy(() =>
  import("pages/dashboard/analyticDashboard")
);
const ServiceDashboard = lazy(() =>
  import("pages/dashboard/ServicesDashBoard")
);
// const Roles = lazy(() => import("pages/role"));
const Roles = lazy(() => import("pages/roleManage"));

const Login = lazy(() => import("pages/login"));
const LogOut = lazy(() => import("pages/logout/index"));
const ForgetPassword = lazy(() => import("pages/forgetPassword"));

const BlogPost = lazy(() => import("pages/setting/blogPostSetting/index"));
const BlogPostCategory = lazy(() =>
  import("pages/setting/blogPostSetting/PostCategory")
);
const BlogPostTag = lazy(() => import("pages/setting/blogPostSetting/PostTag"));
const BlogPostAuthor = lazy(() =>
  import("pages/setting/blogPostSetting/PostAuthor")
);
const AddBlogPost = lazy(() => import("pages/setting/blogPostSetting/create"));
const EditBlogPost = lazy(() => import("pages/setting/blogPostSetting/edit"));
//shipping
const ShippingMethod = lazy(() => import("pages/superadmin/shippingMethod"));
const ShippingSetting = lazy(() =>
  import("pages/setting/shippingSetting/ShippingSetting")
);
const Ticket = lazy(() => import("pages/support/ticket/index"));
const TicketReply = lazy(() => import("pages/support/ticket/Reply"));
const WebFunction = lazy(() =>
  import("pages/setting/webFunctionSetting/index")
);
const FeaturedGroup = lazy(() =>
  import("pages/ecommerce/featureGroupProduct/FeatureGroup")
);
const ListingFeaturedGroup = lazy(() =>
  import("pages/listing/featureGroupProduct/FeatureGroup")
);

// const User = lazy(() => import("./pages/user"));
const Category = lazy(() => import("pages/ecommerce/category/index"));

const ProductFilterlist = lazy(() =>
  import("pages/ecommerce/category/component/Productlist")
);

const Listing = lazy(() => import("pages/listing/category/index"));
const ListProduct = lazy(() => import("pages/listing/product"));
const ListProductCreate = lazy(() => import("pages/listing/product/Create"));
const ListingShow = lazy(() => import("pages/listing/product/Detail"));
const ListingEdit = lazy(() => import("pages/listing/product/Edit"));
const Faqview = lazy(() => import("pages/faq/index"));
const Coupon = lazy(() => import("pages/ecommerce/coupon/index"));
const Supplier = lazy(() => import("pages/ecommerce/supplier"));

const NotificationSetting = lazy(() =>
  import("pages/setting/notificationSetting/index")
);

const AccountSetting = lazy(() =>
  import("pages/setting/accountSetting/Create")
);

const PaymentTermSetting = lazy(() =>
  import("pages/crm/lead_setting/payment_term_setting/index")
);

const Brand = lazy(() => import("pages/ecommerce/brand"));

const Product = lazy(() => import("pages/ecommerce/product"));
const ProductCreate = lazy(() => import("pages/ecommerce/product/Create"));
const ProductEdit = lazy(() => import("pages/ecommerce/product/Edit"));
const ProductShow = lazy(() => import("pages/ecommerce/product/Detail"));
const ProductOptions = lazy(() =>
  import("pages/ecommerce/productOptions/index")
);
const ProductFilter = lazy(() => import("pages/ecommerce/product"));
const ListingFilter = lazy(() => import("pages/listing/product"));
const Setting = lazy(() => import("pages/setting"));
const Module = lazy(() => import("pages/module/index"));
const ProductType = lazy(() => import("pages/superadmin/productType/index"));

const Template = lazy(() => import("pages/superadmin/template/Theme"));
const SuperTemplateCode = lazy(() => import("pages/superadmin/template/view"));

const TemplateDetail = lazy(() =>
  import("pages/superadmin/template/ThemeDetail")
);

const Templatesectiongroup = lazy(() =>
  import("pages/superadmin/template/Section")
);

// template

const PlanToFeature = lazy(() =>
  import("pages/superadmin/planTofeature/create")
);

const TemplateComponent = lazy(() =>
  import("pages/superadmin/templateComponent/Index")
);

const WebTestimonial = lazy(() =>
  import("pages/setting/TestimonialSetting/index")
);

const SubscriptionPayment = lazy(() =>
  import("pages/superadmin/subscriptionPayment")
);
const WebFeature = lazy(() => import("pages/ecommerce/webFeature/index"));
// website setting
const WebSetting = lazy(() => import("pages/setting/websetting/WebSetting"));
const ServiceSubscription = lazy(() => import("pages/subscription/index"));
const ViewSubscriptions = lazy(() => import("pages/subscription/view/index"));
// theme setting
const Theme = lazy(() => import("pages/setting/templateSetting/Theme"));
const ThemeDetail = lazy(() =>
  import("pages/setting/templateSetting/ThemeDetail")
);

const TemplateCode = lazy(() => import("pages/setting/templateSetting/view"));

// / app setting
const AppSetting = lazy(() => import("pages/setting/appSetting/AppSetting"));
//payment setting
const PaymentSetting = lazy(() =>
  import("pages/setting/paymentSetting/PaymentSetting")
);

// pages setting
const PagesSetting = lazy(() => import("pages/setting/pageSetting/index"));
const AddPagesSetting = lazy(() => import("pages/setting/pageSetting/Create"));
const EditPagesSetting = lazy(() => import("pages/setting/pageSetting/Edit"));

const BannerGroup = lazy(() =>
  import("pages/setting/bannerSetting/BannerGroup")
);
const Banner = lazy(() => import("pages/setting/bannerSetting/Banner"));

const SliderImages = lazy(() =>
  import("pages/setting/sliderSetting/SliderImages")
);

const Slider = lazy(() => import("pages/setting/sliderSetting/Slider"));
// menu group
const MenuGroup = lazy(() => import("pages/setting/menuSetting/MenuGroup"));
const Menu = lazy(() => import("pages/setting/menuSetting/Menu"));
//EmailGroup
const EmailGroup = lazy(() => import("pages/setting/emailSetting/EmailGroup"));
const EmailTemplate = lazy(() =>
  import("pages/setting/emailSetting/EmailTemplate")
);
const PageNotFound = lazy(() => import("pages/error/pageNotFound"));
const Demo = lazy(() => import("pages/demo/index"));
const Form = lazy(() => import("pages/crm/form/index"));
const Reviews = lazy(() => import("pages/ecommerce/reviews/index"));

// superadmins
const SuperDashboard = lazy(() => import("pages/superadmin/dashboard"));
const SuperLogin = lazy(() => import("pages/superadmin/login"));
const SeoDashboard = lazy(() => import("pages/superadmin/seodash"));

const SuperUser = lazy(() => import("pages/superadmin/user"));

const SuperForgetPassword = lazy(() =>
  import("pages/superadmin/forgetPassword")
);
const SuperSetting = lazy(() => import("pages/superadmin/setting"));
const SuperUserEdit = lazy(() => import("pages/superadmin/user/UserEdit"));
const DbUpdate = lazy(() => import("pages/superadmin/appDbupdate"));
const DbUpdateCreate = lazy(() =>
  import("pages/superadmin/appDbupdate/create")
);

const Subscription = lazy(() => import("pages/superadmin/subscription/index"));

const ViewSubscription = lazy(() =>
  import("pages/superadmin/subscription/view")
);

const SubscriberBusiness = lazy(() =>
  import("pages/superadmin/subscriber/index")
);

const ViewSubscriber = lazy(() =>
  import("pages/superadmin/subscription/index")
);

const Language = lazy(() => import("pages/superadmin/language"));
const Country = lazy(() => import("pages/superadmin/country"));
const Currency = lazy(() => import("pages/superadmin/currency"));
const Industry = lazy(() => import("pages/superadmin/industry"));
const IndustryCategory = lazy(() =>
  import("pages/superadmin/industry/Category")
);
const TranslationView = lazy(() => import("pages/superadmin/translation"));

//global
const PageAccessCheck = lazy(() => import("pages/PageAccessCheck"));
const PaymentPage = lazy(() => import("pages/PaymentPage"));
const PaymentMethod = lazy(() => import("pages/superadmin/paymentMethod"));

const SettingGroupList = lazy(() =>
  import("pages/superadmin/settingGroup/index")
);
const WebSettingGroupList = lazy(() =>
  import("pages/superadmin/webSettingGroup/index")
);

const EditWebSettingGroup = lazy(() =>
  import("pages/superadmin/webSettingGroup/SettingGroup")
);

//Services
const ServicePlanGroup = lazy(() => import("pages/service/index"));
const ServicePlan = lazy(() => import("pages/service/Plan"));
const ServicePlanFeature = lazy(() => import("pages/service/PlanFeatureUI"));
//Landing Plan
const LandingPlanGroup = lazy(() => import("pages/superadmin/service/index"));
const LandingPlan = lazy(() => import("pages/superadmin/service/Plan"));
const LandinPlanFeature = lazy(() =>
  import("pages/superadmin/service/PlanFeatureUI")
);
const LandingPlanPrice = lazy(() =>
  import("pages/superadmin/service/PlanPrice")
);
const EditSettingGroup = lazy(() =>
  import("pages/superadmin/settingGroup/SettingGroup")
);

const ViewServicePlanPrice = lazy(() => import("pages/service/PlanPrice"));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, language, language_list, industry, role, subsId } =
    useSelector((state) => state.login);

  useEffect(() => {
    let abortController = new AbortController();

    async function getLang() {
      await POST(SuperGeneralSettingUrl, {
        language: language,
        lang_key: "backend",
      })
        .then((response) => {
          const dataVal = response.data.data.language_data.lang_value;
          const setting_data = response.data.data.setting_data;
          const formData = {
            lang: language,
            langDetails: dataVal,
          };
          dispatch(updateLangState(formData));
          dispatch(updateSuperSettingState(setting_data));
        })
        .catch((error) => {});
    }

    function loadItem() {
      const languageL = language_list;
      if (languageL === null) getLang();

      // Enable pusher logging - don't include this in production
      // Pusher.logToConsole = true;
      var pusher = new Pusher("02717d93b527131cbae8", {
        cluster: "ap2",
      });
      var channel = pusher.subscribe("global-channel");
      channel.bind("global-event", function (data) {
        //all data
        var dataJSON = JSON.stringify(data);
        var objectData = JSON.parse(dataJSON);
        //end all data

        if (objectData.KEY !== "working") {
          //key data
          var KeyListData = data.KEY;
          var notificationList = JSON.parse(KeyListData);
          var n_message = notificationList.n_message;

          if (subsId == notificationList.subs_id) {
            ToasterNotify(true, Trans(n_message, language));
          }
        }
      });
    }
    loadItem();
    return () => {
      // loadItem();
      abortController.abort();
    };
  }, [dispatch, language, language_list]);

  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route
            path="/subscription/payment/:paymentId"
            element={<PaymentPage />}
          />

          <Route
            path="/"
            element={<AdminLayout />}>
            <Route
              index
              element={
                <PageAccessCheck
                  component={
                    (industry === "1" || industry === 1) ? (
                     role === "super_admin" ? (
                        <Dashboard />
                      ) : (
                        // uSER DASH
                        <UserDashboard/>
                      )
                    ) : (
                      <ServiceDashboard />
                    )
                    
                  }
                />
              }

            />


 
            <Route
              exact
              path="/role"
              element={<PageAccessCheck component={<Roles />} />}
            />
            <Route
              exact
              path="/sales-dashboard"
              element={<PageAccessCheck component={<SalesDashboard />} />}
            />
            <Route
              exact
              path="/analytic-dashboard"
              element={<PageAccessCheck component={<AnalTicDashboard />} />}
            />
            <Route
              exact
              path="/service-subscription"
              element={<PageAccessCheck component={<ServiceSubscription />} />}
            />
            <Route
              exact
              path="/service-subscription/view/:subcription_id"
              element={<PageAccessCheck component={<ViewSubscriptions />} />}
            />

            <Route
              exact
              path="/faq"
              element={<PageAccessCheck component={<Faqview />} />}
            />
            <Route
              exact
              path="/coupon"
              element={<PageAccessCheck component={<Coupon />} />}
            />
            <Route
              exact
              path="/themes"
              element={<PageAccessCheck component={<Theme />} />}
            />
            <Route
              exact
              path="/themes/design/:themeId"
              element={<PageAccessCheck component={<ThemeDetail />} />}
            />
            <Route
              exact
              path="/themes/code/:themeId"
              element={<PageAccessCheck component={<TemplateCode />} />}
            />
            <Route
              exact
              path="/feature"
              element={<PageAccessCheck component={<WebFeature />} />}
            />
            <Route
              exact
              path="/testimonial"
              element={<PageAccessCheck component={<WebTestimonial />} />}
            />
            <Route
              exact
              path="/service-plan-group"
              element={<PageAccessCheck component={<ServicePlanGroup />} />}
            />
            <Route
              exact
              path="/service-plan-group/:grpId"
              element={<PageAccessCheck component={<ServicePlan />} />}
            />
            <Route
              exact
              path="/service-plan-group/feature/:grpId"
              element={<PageAccessCheck component={<ServicePlanFeature />} />}
            />
            <Route
              exact
              path="/service-plan-group/view/:plnId"
              element={<PageAccessCheck component={<ViewServicePlanPrice />} />}
            />
            <Route
              exact
              path="/function-settings"
              element={<PageAccessCheck component={<WebFunction />} />}
            />
            <Route
              exact
              path="/blog-setting"
              element={<PageAccessCheck component={<BlogPost />} />}
            />
            <Route
              exact
              path="/blog-setting/category"
              element={<PageAccessCheck component={<BlogPostCategory />} />}
            />
            <Route
              exact
              path="/blog-setting/tag"
              element={<PageAccessCheck component={<BlogPostTag />} />}
            />
            <Route
              exact
              path="/blog-setting/author"
              element={<PageAccessCheck component={<BlogPostAuthor />} />}
            />
            <Route
              exact
              path="/blog-setting/add"
              element={<PageAccessCheck component={<AddBlogPost />} />}
            />
            <Route
              exact
              path="/blog-setting/edit/:postId"
              element={<PageAccessCheck component={<EditBlogPost />} />}
            />
            <Route
              exact
              path="/user"
              element={<PageAccessCheck component={<SuperUser />} />}
            />
            {/* commerce */}
            <Route
              exact
              path="/categories"
              element={<PageAccessCheck component={<Category />} />}
            />
            <Route
              exact
              path="/categories/:catId"
              element={<PageAccessCheck component={<Category />} />}
            />
            <Route
              exact
              path="/products/:ctId"
              element={<PageAccessCheck component={<ProductFilter />} />}
            />
            <Route
              exact
              path="/business-listing/:ctId"
              element={<PageAccessCheck component={<ListingFilter />} />}
            />
            <Route
              exact
              path="/categories/list/:ctId"
              element={<PageAccessCheck component={<ProductFilterlist />} />}
            />
            <Route
              exact
              path="/supplier"
              element={<PageAccessCheck component={<Supplier />} />}
            />
            <Route
              exact
              path="/email-settings"
              element={<PageAccessCheck component={<EmailGroup />} />}
            />
            <Route
              exact
              path="/email-settings/:menuGroupId"
              element={<PageAccessCheck component={<EmailTemplate />} />}
            />

            <Route
              exact
              path="/notificationSetting"
              element={<PageAccessCheck component={<NotificationSetting />} />}
            />
            <Route
              exact
              path="/account-setting"
              element={<PageAccessCheck component={<AccountSetting />} />}
            />
            <Route
              exact
              path="/payment-term"
              element={<PageAccessCheck component={<PaymentTermSetting />} />}
            />

            <Route
              exact
              path="/brand"
              element={<PageAccessCheck component={<Brand />} />}
            />
            <Route
              exact
              path="/app-settings"
              element={<PageAccessCheck component={<AppSetting />} />}
            />
            <Route
              exact
              path="/payment-setting"
              element={<PageAccessCheck component={<PaymentSetting />} />}
            />
            <Route
              exact
              path="/web-setting"
              element={<PageAccessCheck component={<WebSetting />} />}
            />
            <Route
              exact
              path="/pages-setting"
              element={<PageAccessCheck component={<PagesSetting />} />}
            />
            <Route
              exact
              path="/pages-setting/add"
              element={<PageAccessCheck component={<AddPagesSetting />} />}
            />
            <Route
              exact
              path="/pages-setting/edit/:pageId"
              element={<PageAccessCheck component={<EditPagesSetting />} />}
            />
            <Route
              exact
              path="/slider"
              element={<PageAccessCheck component={<Slider />} />}
            />
            <Route
              exact
              path="/slider/:sliderId"
              element={<PageAccessCheck component={<SliderImages />} />}
            />
            <Route
              exact
              path="/feature-product"
              element={<PageAccessCheck component={<FeaturedGroup />} />}
            />
            <Route
              exact
              path="/feature-listing"
              element={<PageAccessCheck component={<ListingFeaturedGroup />} />}
            />
            <Route
              exact
              path="/banner-setting"
              element={<PageAccessCheck component={<Banner />} />}
            />
            <Route
              exact
              path="/menu-setting"
              element={<PageAccessCheck component={<MenuGroup />} />}
            />
            <Route
              exact
              path="/menu-setting/:menuGroupId"
              element={<PageAccessCheck component={<Menu />} />}
            />
            <Route
              exact
              path="/products"
              element={<PageAccessCheck component={<Product />} />}
            />
            <Route
              exact
              path="/business-listing"
              element={<PageAccessCheck component={<ListProduct />} />}
            />
            <Route
              exact
              path="/product-options"
              element={<PageAccessCheck component={<ProductOptions />} />}
            />
            <Route
              exact
              path="/reviews"
              element={<PageAccessCheck component={<Reviews />} />}
            />
            <Route
              exact
              path="/ticket"
              element={<PageAccessCheck component={<Ticket />} />}
            />
            <Route
              exact
              path="/ticket/view/:Id"
              element={<PageAccessCheck component={<TicketReply />} />}
            />
            <Route
              exact
              path="/custom-form"
              element={<PageAccessCheck component={<Form />} />}
            />
            {/* listing */}
            <Route
              exact
              path="/business-category"
              element={<PageAccessCheck component={<Listing />} />}
            />
            <Route
              exact
              path="/business-category/:catId"
              element={<PageAccessCheck component={<Listing />} />}
            />
            {/* ProductAdd */}
            <Route
              exact
              path="/products/create"
              element={<PageAccessCheck component={<ProductCreate />} />}
            />
            <Route
              exact
              path="/products/edit/:proId"
              element={<PageAccessCheck component={<ProductEdit />} />}
            />
            <Route
              exact
              path="/business-listing/edit/:prId"
              element={<PageAccessCheck component={<ListingEdit />} />}
            />
            <Route
              exact
              path="/business-listing/create"
              element={<PageAccessCheck component={<ListProductCreate />} />}
            />
            <Route
              exact
              path="/shipping-setting"
              element={<PageAccessCheck component={<ShippingSetting />} />}
            />
            <Route
              exact
              path="/products/show/:proId"
              element={<PageAccessCheck component={<ProductShow />} />}
            />
            <Route
              exact
              path="/business-listing/show/:proId"
              element={<PageAccessCheck component={<ListingShow />} />}
            />
            <Route
              exact
              path="/demo"
              element={<Demo />}
            />
            <Route
              exact
              path="/user/edit/:userId"
              element={<PageAccessCheck component={<SuperUserEdit />} />}
            />
            <Route
              exact
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />

            <Route
              exact
              path="/logout"
              element={<PageAccessCheck component={<LogOut />} />}
            />
            <Route
              exact
              path="/forget-password"
              element={
                isAuthenticated ? <Navigate to="/" /> : <ForgetPassword />
              }
            />
            <Route
              exact
              path="/setting"
              element={<PageAccessCheck component={<Setting />} />}
            />

            {/* superadmin all route store here */}
            <Route
              path="superadmin"
              element={<SuperAdminLayout />}>
              <Route
                exact
                path="payment-setting"
                element={<PageAccessCheck component={<PaymentSetting />} />}
              />
              <Route
                exact
                path="email-settings"
                element={<PageAccessCheck component={<EmailGroup />} />}
              />
              <Route
                exact
                path="account-setting"
                element={<PageAccessCheck component={<AccountSetting />} />}
              />
              <Route
                exact
                path="accountSetting"
                element={<PageAccessCheck component={<AccountSetting />} />}
              />
              <Route
                exact
                path="email-settings/:menuGroupId"
                element={<PageAccessCheck component={<EmailTemplate />} />}
              />
              <Route
                exact
                path="shipping"
                element={<PageAccessCheck component={<ShippingMethod />} />}
              />

              <Route
                exact
                path="custom-form"
                element={<PageAccessCheck component={<Form />} />}
              />
              <Route
                exact
                path="testimonial"
                element={<PageAccessCheck component={<WebTestimonial />} />}
              />

              <Route
                index
                element={
                  <PageAccessCheck
                    component={
                      role === "super_admin"  ? (
                        <SuperDashboard />
                        
                      ) : (
                        <SeoDashboard />
                      )
                    }
                  />
                }
              />
              <Route
                exact
                path="login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/superadmin/" />
                  ) : (
                    <SuperLogin />
                  )
                }
              />

              <Route
                exact
                path="forget-password"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <SuperForgetPassword />
                  )
                }
              />
              <Route
                exact
                path="subscription"
                element={<PageAccessCheck component={<Subscription />} />}
              />
              <Route
                exact
                path="app-settings"
                element={<PageAccessCheck component={<AppSetting />} />}
              />
              <Route
                exact
                path="app-settings"
                element={<PageAccessCheck component={<AppSetting />} />}
              />
              <Route
                exact
                path="blog-setting"
                element={<PageAccessCheck component={<BlogPost />} />}
              />
              <Route
                exact
                path="blog-setting/category"
                element={<PageAccessCheck component={<BlogPostCategory />} />}
              />
              <Route
                exact
                path="blog-setting/tag"
                element={<PageAccessCheck component={<BlogPostTag />} />}
              />
              <Route
                exact
                path="blog-setting/author"
                element={<PageAccessCheck component={<BlogPostAuthor />} />}
              />
              <Route
                exact
                path="blog-setting/add"
                element={<PageAccessCheck component={<AddBlogPost />} />}
              />
              <Route
                exact
                path="blog-setting/edit/:postId"
                element={<PageAccessCheck component={<EditBlogPost />} />}
              />
              <Route
                exact
                path="pages-setting"
                element={<PageAccessCheck component={<PagesSetting />} />}
              />
              <Route
                exact
                path="pages-setting/add"
                element={<PageAccessCheck component={<AddPagesSetting />} />}
              />
              <Route
                exact
                path="pages-setting/edit/:pageId"
                element={<PageAccessCheck component={<EditPagesSetting />} />}
              />
              <Route
                exact
                path="coupon"
                element={<PageAccessCheck component={<Coupon />} />}
              />
              <Route
                exact
                path="logout"
                element={<PageAccessCheck component={<LogOut />} />}
              />
              <Route
                exact
                path="web-setting"
                element={<PageAccessCheck component={<WebSetting />} />}
              />
              {/*landing urls */}
              <Route
                exact
                path="service-plan-group"
                element={<PageAccessCheck component={<LandingPlanGroup />} />}
              />
              <Route
                exact
                path="service-plan-group/:grpId"
                element={<PageAccessCheck component={<LandingPlan />} />}
              />
              <Route
                exact
                path="service-plan-group/feature/:grpId"
                element={<PageAccessCheck component={<LandinPlanFeature />} />}
              />
              <Route
                exact
                path="service-plan-group/view/:plnId"
                element={<PageAccessCheck component={<LandingPlanPrice />} />}
              />
              <Route
                exact
                path="banner-setting"
                element={<PageAccessCheck component={<BannerGroup />} />}
              />
              <Route
                exact
                path="banner-setting/:bannerGroupId"
                element={<PageAccessCheck component={<Banner />} />}
              />
              <Route
                exact
                path="menu-setting"
                element={<PageAccessCheck component={<MenuGroup />} />}
              />
              <Route
                exact
                path="menu-setting/:menuGroupId"
                element={<PageAccessCheck component={<Menu />} />}
              />
              <Route
                exact
                path="payment"
                element={<PageAccessCheck component={<PaymentMethod />} />}
              />
              <Route
                exact
                path="subscription/:business_id"
                element={<PageAccessCheck component={<Subscription />} />}
              />
              <Route
                exact
                path="subscription/view/:subcription_id"
                element={<PageAccessCheck component={<ViewSubscription />} />}
              />

              <Route
                exact
                path="language"
                element={<PageAccessCheck component={<Language />} />}
              />
              <Route
                exact
                path="translation"
                element={<PageAccessCheck component={<TranslationView />} />}
              />
              <Route
                exact
                path="web-setting-group"
                element={
                  <PageAccessCheck component={<WebSettingGroupList />} />
                }
              />
              <Route
                exact
                path="web-setting-group/view/:grpId"
                element={
                  <PageAccessCheck component={<EditWebSettingGroup />} />
                }
              />
              <Route
                exact
                path="setting-group"
                element={<PageAccessCheck component={<SettingGroupList />} />}
              />
              <Route
                exact
                path="setting-group/view/:groupId"
                element={<PageAccessCheck component={<EditSettingGroup />} />}
              />
              <Route
                exact
                path="country"
                element={<PageAccessCheck component={<Country />} />}
              />
              <Route
                exact
                path="industry"
                element={<PageAccessCheck component={<Industry />} />}
              />
              <Route
                exact
                path="industry/view/:industryId"
                element={<PageAccessCheck component={<IndustryCategory />} />}
              />
              <Route
                exact
                path="module"
                element={<PageAccessCheck component={<Module />} />}
              />
              <Route
                exact
                path="ticket"
                element={<PageAccessCheck component={<Ticket />} />}
              />
              <Route
                exact
                path="ticket/view/:Id"
                element={<PageAccessCheck component={<TicketReply />} />}
              />
              <Route
                exact
                path="template"
                element={<PageAccessCheck component={<Template />} />}
              />
              <Route
                exact
                path="template-component"
                element={<PageAccessCheck component={<TemplateComponent />} />}
              />
              <Route
                exact
                path="themes/code/:themeId"
                element={<PageAccessCheck component={<SuperTemplateCode />} />}
              />
              <Route
                exact
                path="template/:themeId"
                element={<PageAccessCheck component={<TemplateDetail />} />}
              />
              <Route
                exact
                path="template/section"
                element={
                  <PageAccessCheck component={<Templatesectiongroup />} />
                }
              />
              <Route
                exact
                path="product-type"
                element={<PageAccessCheck component={<ProductType />} />}
              />
              <Route
                exact
                path="currency"
                element={<PageAccessCheck component={<Currency />} />}
              />

              <Route
                exact
                path="db-update"
                element={<PageAccessCheck component={<DbUpdate />} />}
              />

              <Route
                exact
                path="db-update/create"
                element={<PageAccessCheck component={<DbUpdateCreate />} />}
              />

              <Route
                exact
                path="subscriber"
                element={<PageAccessCheck component={<SubscriberBusiness />} />}
              />
              <Route
                exact
                path="subscription-payment"
                element={
                  <PageAccessCheck component={<SubscriptionPayment />} />
                }
              />

              <Route
                exact
                path="subscriber/view/:business_id"
                element={<PageAccessCheck component={<ViewSubscriber />} />}
              />
              <Route
                exact
                path="role"
                element={<PageAccessCheck component={<Roles />} />}
              />
              <Route
                exact
                path="plan-to-feature"
                element={<PageAccessCheck component={<PlanToFeature />} />}
              />
              <Route
                exact
                path="user"
                element={<PageAccessCheck component={<SuperUser />} />}
              />
              {/* commerce */}
              <Route
                exact
                path="categories"
                element={<PageAccessCheck component={<Category />} />}
              />
              <Route
                exact
                path="faq"
                element={<PageAccessCheck component={<Faqview />} />}
              />
              <Route
                exact
                path="products"
                element={<PageAccessCheck component={<Product />} />}
              />
              <Route
                exact
                path="user/edit/:userId"
                element={
                  isAuthenticated ? (
                    <SuperUserEdit />
                  ) : (
                    <Navigate to="/superadmin/login" />
                  )
                }
              />
              <Route
                exact
                path="setting/:pageCall/:pagetype"
                element={<PageAccessCheck component={<SuperSetting />} />}
              />
              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Route>
            {/* end super admin all route */}
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

function AdminLayout() {
  return (
    <SuperAdmin>
      <Outlet />
    </SuperAdmin>
  );
}
function SuperAdminLayout() {
  return (
    // <SuperAdmin>
    <Outlet />
    // </SuperAdmin>
  );
}

export default App;

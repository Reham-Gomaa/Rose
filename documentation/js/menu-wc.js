'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@angular-monorepo/source documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link" >AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AboutUsComponent.html" data-type="entity-link" >AboutUsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddressChoiceComponent.html" data-type="entity-link" >AddressChoiceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddressComponent.html" data-type="entity-link" >AddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddressItemComponent.html" data-type="entity-link" >AddressItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddressStepperComponent.html" data-type="entity-link" >AddressStepperComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AllCategoriesComponent.html" data-type="entity-link" >AllCategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthComponent.html" data-type="entity-link" >AuthComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BestSellerComponent.html" data-type="entity-link" >BestSellerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BestsellerSliderComponent.html" data-type="entity-link" >BestsellerSliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonThemeComponent.html" data-type="entity-link" >ButtonThemeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CardItemComponent.html" data-type="entity-link" >CardItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CartComponent.html" data-type="entity-link" >CartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoriesComponent.html" data-type="entity-link" >CategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChangePasswordComponent.html" data-type="entity-link" >ChangePasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckedCardComponent.html" data-type="entity-link" >CheckedCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckoutComponent.html" data-type="entity-link" >CheckoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" >ConfirmDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactComponent.html" data-type="entity-link" >ContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomInputComponent.html" data-type="entity-link" >CustomInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomInputPhoneComponent.html" data-type="entity-link" >CustomInputPhoneComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomMainDialogComponent.html" data-type="entity-link" >CustomMainDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomModalComponent.html" data-type="entity-link" >CustomModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteDialogComponent.html" data-type="entity-link" >DeleteDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DetailsComponent.html" data-type="entity-link" >DetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditProfileComponent.html" data-type="entity-link" >EditProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpertTeamComponent.html" data-type="entity-link" >ExpertTeamComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterCardComponent.html" data-type="entity-link" >FilterCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterCategoriesComponent.html" data-type="entity-link" >FilterCategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterCategoryComponent.html" data-type="entity-link" >FilterCategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterOccasionsComponent.html" data-type="entity-link" >FilterOccasionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterPriceComponent.html" data-type="entity-link" >FilterPriceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterRatingComponent.html" data-type="entity-link" >FilterRatingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterSalesComponent.html" data-type="entity-link" >FilterSalesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgetPasswordComponent.html" data-type="entity-link" >ForgetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormButtonComponent.html" data-type="entity-link" >FormButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryComponent.html" data-type="entity-link" >GalleryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GiftsComponent.html" data-type="entity-link" >GiftsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeadAddressComponent.html" data-type="entity-link" >HeadAddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputBtnComponent.html" data-type="entity-link" >InputBtnComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputErrorHandlingComponent.html" data-type="entity-link" >InputErrorHandlingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoDataAvailableComponent.html" data-type="entity-link" >NoDataAvailableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundComponent.html" data-type="entity-link" >NotFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationToastComponent.html" data-type="entity-link" >NotificationToastComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NxWelcomeComponent.html" data-type="entity-link" >NxWelcomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrderFlowComponent.html" data-type="entity-link" >OrderFlowComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrdersComponent.html" data-type="entity-link" >OrdersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OurServicesComponent.html" data-type="entity-link" >OurServicesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaymentMethodComponent.html" data-type="entity-link" >PaymentMethodComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PopularItemsComponent.html" data-type="entity-link" >PopularItemsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductDetailsComponent.html" data-type="entity-link" >ProductDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductReviewComponent.html" data-type="entity-link" >ProductReviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterComponent.html" data-type="entity-link" >RegisterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RelatedProductsComponent.html" data-type="entity-link" >RelatedProductsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" >ResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ReviewFormComponent.html" data-type="entity-link" >ReviewFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ReviewListComponent.html" data-type="entity-link" >ReviewListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchModalComponent.html" data-type="entity-link" >SearchModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SeparatorComponent.html" data-type="entity-link" >SeparatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SetPasswordComponent.html" data-type="entity-link" >SetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SortingComponent.html" data-type="entity-link" >SortingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpeedDialComponent.html" data-type="entity-link" >SpeedDialComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpinnerComponent.html" data-type="entity-link" >SpinnerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepperComponent.html" data-type="entity-link" >StepperComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepperComponent-1.html" data-type="entity-link" >StepperComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestimonialsComponent.html" data-type="entity-link" >TestimonialsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TranslateToggleComponent.html" data-type="entity-link" >TranslateToggleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrustedByComponent.html" data-type="entity-link" >TrustedByComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserAddressComponent.html" data-type="entity-link" >UserAddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserProfileComponent.html" data-type="entity-link" >UserProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VerifyCodeComponent.html" data-type="entity-link" >VerifyCodeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WishlistComponent.html" data-type="entity-link" >WishlistComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/EnglishOnlyDirective.html" data-type="entity-link" >EnglishOnlyDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/WishlistToggleDirective.html" data-type="entity-link" >WishlistToggleDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddressEffect.html" data-type="entity-link" >AddressEffect</a>
                            </li>
                            <li class="link">
                                <a href="classes/checkoutEffects.html" data-type="entity-link" >checkoutEffects</a>
                            </li>
                            <li class="link">
                                <a href="classes/EndPoint.html" data-type="entity-link" >EndPoint</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterEffects.html" data-type="entity-link" >FilterEffects</a>
                            </li>
                            <li class="link">
                                <a href="classes/sortEffects.html" data-type="entity-link" >sortEffects</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BestSellerService.html" data-type="entity-link" >BestSellerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartEffects.html" data-type="entity-link" >CartEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckoutService.html" data-type="entity-link" >CheckoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DarkModeService.html" data-type="entity-link" >DarkModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OccasionsService.html" data-type="entity-link" >OccasionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageManagerService.html" data-type="entity-link" >StorageManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslateTitleStrategy.html" data-type="entity-link" >TranslateTitleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslationService.html" data-type="entity-link" >TranslationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAddressService.html" data-type="entity-link" >UserAddressService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserStateService.html" data-type="entity-link" >UserStateService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdaptivePricing.html" data-type="entity-link" >AdaptivePricing</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressAddRes.html" data-type="entity-link" >AddressAddRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressRes.html" data-type="entity-link" >AddressRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressState.html" data-type="entity-link" >AddressState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link" >AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutomaticTax.html" data-type="entity-link" >AutomaticTax</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BestSeller.html" data-type="entity-link" >BestSeller</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BestSellerRes.html" data-type="entity-link" >BestSellerRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Card.html" data-type="entity-link" >Card</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/carouselListInterface.html" data-type="entity-link" >carouselListInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cart.html" data-type="entity-link" >Cart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/cartItems.html" data-type="entity-link" >cartItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartResponse.html" data-type="entity-link" >CartResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/cartState.html" data-type="entity-link" >cartState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CashRes.html" data-type="entity-link" >CashRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryOption.html" data-type="entity-link" >CategoryOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryProductCount.html" data-type="entity-link" >CategoryProductCount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryRes.html" data-type="entity-link" >CategoryRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/checkoutFailureRes.html" data-type="entity-link" >checkoutFailureRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/checkoutState.html" data-type="entity-link" >checkoutState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollectedInformation.html" data-type="entity-link" >CollectedInformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/countBproduct.html" data-type="entity-link" >countBproduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Country.html" data-type="entity-link" >Country</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreditRes.html" data-type="entity-link" >CreditRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerDetails.html" data-type="entity-link" >CustomerDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomText.html" data-type="entity-link" >CustomText</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error.html" data-type="entity-link" >Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterItem.html" data-type="entity-link" >FilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterState.html" data-type="entity-link" >FilterState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/forgetFlowDetails.html" data-type="entity-link" >forgetFlowDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Headers.html" data-type="entity-link" >Headers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Headers2.html" data-type="entity-link" >Headers2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceCreation.html" data-type="entity-link" >InvoiceCreation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceData.html" data-type="entity-link" >InvoiceData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Metadata.html" data-type="entity-link" >Metadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Metadata-1.html" data-type="entity-link" >Metadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Metadata2.html" data-type="entity-link" >Metadata2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NormalizedNames.html" data-type="entity-link" >NormalizedNames</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/occasion.html" data-type="entity-link" >occasion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/occasionRes.html" data-type="entity-link" >occasionRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderItem.html" data-type="entity-link" >OrderItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderRes.html" data-type="entity-link" >OrderRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Orders.html" data-type="entity-link" >Orders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationData.html" data-type="entity-link" >PaginationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/payInfo.html" data-type="entity-link" >payInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentMethodConfigurationDetails.html" data-type="entity-link" >PaymentMethodConfigurationDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentMethodOptions.html" data-type="entity-link" >PaymentMethodOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/payMethod.html" data-type="entity-link" >payMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PhoneNumberCollection.html" data-type="entity-link" >PhoneNumberCollection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/picsInterface.html" data-type="entity-link" >picsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product-1.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductDetail.html" data-type="entity-link" >ProductDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductDetails.html" data-type="entity-link" >ProductDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductDetailsRes.html" data-type="entity-link" >ProductDetailsRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductRes.html" data-type="entity-link" >ProductRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/progressStep.html" data-type="entity-link" >progressStep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/responsiveOption.html" data-type="entity-link" >responsiveOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/responsiveOptionsInterface.html" data-type="entity-link" >responsiveOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/reviewData.html" data-type="entity-link" >reviewData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/reviewsResponse.html" data-type="entity-link" >reviewsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/selectedItem.html" data-type="entity-link" >selectedItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicesInterface.html" data-type="entity-link" >ServicesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/sortConditions.html" data-type="entity-link" >sortConditions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/sortState.html" data-type="entity-link" >sortState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StepDefinition.html" data-type="entity-link" >StepDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Testimonials.html" data-type="entity-link" >Testimonials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TotalDetails.html" data-type="entity-link" >TotalDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/wishlistStates.html" data-type="entity-link" >wishlistStates</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
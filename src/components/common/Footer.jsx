import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-[120px]">
      {/* Main Footer Content */}
      <section className="w-full bg-secondary-light">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-row justify-start items-center w-full">
              <div className="flex flex-col gap-[32px] justify-start items-center w-full px-[56px] py-[48px] mx-[12px]">
                {/* Footer Links */}
                <ul className="flex flex-row gap-[32px] justify-center items-center w-auto mt-[8px]" role="list">
                  <li>
                    <a 
                      href="#" 
                      className="text-base font-medium leading-base text-left text-text-primary hover:text-primary-background transition-colors"
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '19px',
                        color: '#000000'
                      }}
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-base font-medium leading-base text-left text-text-primary hover:text-primary-background transition-colors"
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '19px',
                        color: '#000000'
                      }}
                    >
                      Returns
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-base font-medium leading-base text-left text-text-primary hover:text-primary-background transition-colors"
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '19px',
                        color: '#000000'
                      }}
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-base font-medium leading-base text-left text-text-primary hover:text-primary-background transition-colors"
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '19px',
                        color: '#000000'
                      }}
                    >
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-base font-medium leading-base text-left text-text-primary hover:text-primary-background transition-colors"
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '19px',
                        color: '#000000'
                      }}
                    >
                      About us
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-base font-medium leading-base text-left text-text-primary hover:text-primary-background transition-colors"
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '19px',
                        color: '#000000'
                      }}
                    >
                      Contact us
                    </a>
                  </li>
                </ul>

                {/* Social Media Icons */}
                <div className="flex flex-row gap-[16px] justify-center items-center w-auto">
                  <a href="#" className="hover:opacity-75 transition-opacity" aria-label="Facebook">
                    <img 
                      src="/images/img_icon_jam_icons.svg" 
                      alt="Facebook" 
                      className="w-[24px] h-[24px]"
                    />
                  </a>
                  <a href="#" className="hover:opacity-75 transition-opacity" aria-label="Twitter">
                    <img 
                      src="/images/img_icon_jam_icons_black_900.svg" 
                      alt="Twitter" 
                      className="w-[24px] h-[24px]"
                    />
                  </a>
                  <a href="#" className="hover:opacity-75 transition-opacity" aria-label="Instagram">
                    <img 
                      src="/images/img_icon_jam_icons_black_900_24x24.svg" 
                      alt="Instagram" 
                      className="w-[24px] h-[24px]"
                    />
                  </a>
                  <a href="#" className="hover:opacity-75 transition-opacity" aria-label="LinkedIn">
                    <img 
                      src="/images/img_icon_jam_icons_24x24.svg" 
                      alt="LinkedIn" 
                      className="w-[24px] h-[24px]"
                    />
                  </a>
                  <a href="#" className="hover:opacity-75 transition-opacity" aria-label="YouTube">
                    <img 
                      src="/images/img_icon_jam_icons_1.svg" 
                      alt="YouTube" 
                      className="w-[24px] h-[24px]"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <section className="w-full bg-primary-background">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-row justify-center items-center w-full py-[14px]">
              <p 
                className="text-base font-medium leading-sm text-center uppercase tracking-[2px] w-full md:w-[34%]"
                style={{
                  fontFamily: 'Public Sans',
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '18px',
                  letterSpacing: '2px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  color: '#e8edde'
                }}
              >
                Copyright Green thumb. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
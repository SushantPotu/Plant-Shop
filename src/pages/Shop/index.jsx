import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import Dropdown from '../../components/ui/Dropdown';

const Shop = () => {
  // add these if i have time
  //const [selectedCategory, setSelectedCategory] = useState('All Categories');
  //const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    planter: false,
    flowers: false,
    care: false,
    heatPack: false
  });
  const [sortBy, setSortBy] = useState('Popular');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const navigate = useNavigate();

  
  useEffect(() => {
  let timer;
  async function fetchPlants() {
    setLoading(true);
    try {
      const queryParam = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : '';
      const res = await fetch(`https://perenual.com/api/species-list?key=sk-nhZh68bd2c79ee7b612242&page=1${queryParam}`);
      if (res.status === 429) {
        console.warn("Rate limited by API");
        return;
      }
      const data = await res.json();
      setProducts((data.data || []).map((plant, idx) => ({
        id: plant.id || idx,
        name: plant.common_name || plant.scientific_name?.[0] || 'Unknown Plant',
        price: '$350',
        image: plant.default_image?.medium_url || plant.default_image?.regular_url || '/images/placeholder.png'
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  timer = setTimeout(fetchPlants, 500); 

  return () => clearTimeout(timer);
}, [searchQuery]);



  const handleFilterChange = (filterName) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: !prev?.[filterName]
    }));
  };

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
);



  return (
    <>
      <Helmet>
        <title>Shop Premium Houseplants | GreenLeaf Plant Collection</title>
        <meta name="description" content="Browse our curated collection of premium houseplants including Marble Queen Pothos, Syngonium Rayii, and rare specimens. Expert care guides included with every plant purchase." />
        <meta property="og:title" content="Shop Premium Houseplants | GreenLeaf Plant Collection" />
        <meta property="og:description" content="Browse our curated collection of premium houseplants including Marble Queen Pothos, Syngonium Rayii, and rare specimens. Expert care guides included with every plant purchase." />
      </Helmet>
      <main className="bg-background-main">
        <Header />
        
        {/* Hero Section */}
        <section className="w-full bg-secondary-light">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row justify-start items-center w-full">
              <div className="flex flex-row justify-start items-center w-full bg-secondary-light">
                <div className="flex flex-row justify-start items-end w-full py-[20px] px-[56px] md:px-[108px]">
                  <h1 
                    className="text-[40px] sm:text-[52px] md:text-[65px] lg:text-[80px] font-normal leading-[60px] sm:leading-[78px] md:leading-[98px] lg:leading-[120px] tracking-[1px] text-left text-text-primary mt-[10px]"
                    style={{
                      fontFamily: 'Poppins',
                      fontSize: '80px',
                      fontWeight: '400',
                      lineHeight: '120px',
                      letterSpacing: '1px',
                      color: '#000000'
                    }}
                  >
                    Shop
                  </h1>
                  <div className="w-[1px] h-[46px] bg-text-primary ml-[32px] self-center"></div>
                  <p 
                    className="text-[14px] sm:text-[18px] md:text-[22px] font-normal leading-[20px] sm:leading-[26px] md:leading-[33px] text-left text-text-primary mb-[38px] ml-[20px]"
                    style={{
                      fontFamily: 'Poppins',
                      fontSize: '22px',
                      fontWeight: '400',
                      lineHeight: '33px',
                      color: '#000000'
                    }}
                  >
                    Find the perfect plant for your space
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Class*/}
        <section className="w-full py-[86px]">
          <div className="w-full max-w-[1230px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Sort Controls (add functionailty)*/}
            <div className="flex flex-col gap-[6px] justify-start items-center w-full mb-[30px]">
              <div className="flex flex-col gap-[8px] justify-center items-end w-full">
                <div className="flex flex-row justify-center items-end w-auto border border-border-dark p-[4px]">
                  <span 
                    className="text-sm font-normal leading-[40px] text-left text-text-accent"
                    style={{
                      fontFamily: 'Open Sans',
                      fontSize: '13px',
                      fontWeight: '400',
                      lineHeight: '20px',
                      color: '#0000007f'
                    }}
                  >
                    Sort By
                  </span>
                  <span 
                    className="text-base font-bold leading-md text-left text-text-primary ml-[6px]"
                    style={{
                      fontFamily: 'Open Sans',
                      fontSize: '14px',
                      fontWeight: '700',
                      lineHeight: '20px',
                      color: '#000000'
                    }}
                  >
                    Popular
                  </span>
                  <img 
                    src="/images/img_arrow_down.svg" 
                    alt="Sort dropdown" 
                    className="w-[20px] h-[20px] self-center ml-[4px]"
                  />
                </div>
                {}{/* Add showing products functionality */}
                <p 
                  className="text-base font-normal leading-md text-left text-text-primary mb-[4px]"
                  style={{
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '20px',
                    color: '#000000'
                  }}
                >
                  Showing 1003 Products
                </p>
              </div>
            </div>

            {/* product grid class*/}
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8">
              {/* sidebar filter class */}
              <div className="flex flex-col gap-[20px] justify-start items-center w-full lg:w-[22%]">
                {/* categories filter class */}
                <div className="flex flex-col gap-[8px] justify-center items-start w-full h-auto shadow-[0px_8px_23px_#506b5221] bg-secondary-background border border-border-light rounded-md p-[12px]">
                  <div className="flex flex-col justify-start items-start w-full mt-[4px] mr-[4px]">
                    <div className="flex flex-row justify-start items-center w-full">
                      <button className="w-[40px] h-[40px] bg-secondary-background rounded-2xl p-[8px] flex items-center justify-center">
                        <img 
                          src="/images/img_chevron_right.svg" 
                          alt="Expand" 
                          className="w-[24px] h-[24px]"
                        />
                      </button>
                      <div className="flex flex-col justify-start items-start flex-1 ml-[8px]">
                        <h3 
                          className="text-2xl font-normal leading-3xl text-left text-accent-dark"
                          style={{
                            fontFamily: 'Open Sans',
                            fontSize: '20px',
                            fontWeight: '400',
                            lineHeight: '28px',
                            color: '#343434'
                          }}
                        >
                          All Categories
                        </h3>
                        <p 
                          className="text-base font-normal leading-md text-left text-text-muted"
                          style={{
                            fontFamily: 'Open Sans',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '20px',
                            color: '#34343499'
                          }}
                        >
                          Plants on Sale
                        </p>
                      </div>
                    </div>

                    {/* Indoor Plants Section */}
                    <div className="flex flex-row justify-start items-start w-full ml-[10px] mt-[20px]">
                      <div className="flex flex-col justify-start items-center self-center w-[20%] h-auto">
                        <div className="flex flex-col justify-start items-center w-full bg-secondary-background rounded-2xl p-[8px]">
                          <div className="flex flex-col justify-start items-center w-full p-[8px]">
                            <img 
                              src="/images/img_arrow_down_blue_gray_900.svg" 
                              alt="Expand indoor plants" 
                              className="w-[12px] h-[6px]"
                            />
                          </div>
                        </div>
                      </div>
                      <h4 
                        className="text-md font-semibold leading-lg text-left text-accent-dark mt-[6px] ml-[8px]"
                        style={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '600',
                          lineHeight: '22px',
                          color: '#343434'
                        }}
                      >
                        Indoor Plants
                      </h4>
                    </div>

                    {/* Plant Categories */}
                  <div className="flex flex-col gap-[8px] w-full ml-[8px] mt-[8px]">
                    {[
                      { type: 'Alocasia', as: 'div' },
                      { type: 'Hoya', as: 'span' },
                      { type: 'Sansevieria', as: 'p' },
                      { type: 'Syngonium', as: 'p' }
                    ].map(({ type, as }, idx) => {
                      const Tag = as;
                      return (
                        <Tag
                          key={type}
                          className="text-md font-normal leading-lg text-left capitalize text-accent-dark bg-secondary-background rounded-sm p-[8px]"
                          style={{
                            marginLeft: '50px',
                            fontFamily: 'Open Sans',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '22px',
                            textTransform: 'capitalize',
                            color: '#343434',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {type}
                        </Tag>
                      );
                    })}
                    <Dropdown
                      placeholder="Show more"
                      text_font_size="16"
                      text_font_family="Open Sans"
                      text_font_weight="200"
                      text_line_height="22px"
                      text_text_align="center"
                      text_text_transform="capitalize"
                      text_color="#343434"
                      fill_background_color="#ffffff"
                      layout_align_self="end"
                      layout_width="70%"
                      padding="8px 36px 8px 12px"
                      margin="0 20px 0 0"
                      position="static"
                      value=""
                      onChange={() => {}}
                      variant="default"
                      size="medium"
                      className=""
                      style={{ marginLeft: '40px', border: "none",
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '600',
                          lineHeight: '22px',
                          color: '#343434'
                        }}
                      options={['Monstera', 'Philodendron', 'Snake Plant']}
                    />
                  </div>

                    {/* Outdoor Plants */}
                    <div className="flex flex-col justify-start items-center w-auto ml-[10px] mt-[8px]">
                      <div className="flex flex-row justify-center items-center w-auto bg-secondary-background rounded-sm p-[8px]">
                        <div className="flex flex-row justify-center items-start w-auto">
                          <button className="w-[40px] h-[40px] bg-secondary-background rounded-2xl p-[8px] self-center flex items-center justify-center">
                            <img 
                              src="/images/img_arrow_right.svg" 
                              alt="Expand outdoor plants" 
                              className="w-[24px] h-[24px]"
                            />
                          </button>
                          <span 
                            className="text-md font-semibold leading-lg text-left text-accent-dark mt-[6px] ml-[8px]"
                            style={{
                              fontFamily: 'Open Sans',
                              fontSize: '16px',
                              fontWeight: '600',
                              lineHeight: '22px',
                              color: '#343434'
                            }}
                          >
                            Outdoor plants
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row justify-center items-center w-auto mt-[-8px] p-[8px] bg-secondary-background">
                        <button className="w-[40px] h-[40px] bg-secondary-background rounded-2xl p-[8px] flex items-center justify-center">
                          <img 
                            src="/images/img_group_6.svg" 
                            alt="Sun requirements" 
                            className="w-[24px] h-[24px]"
                          />
                        </button>
                        <span 
                          className="text-md font-semibold leading-lg text-left text-accent-dark ml-[8px]"
                          style={{
                            fontFamily: 'Open Sans',
                            fontSize: '16px',
                            fontWeight: '600',
                            lineHeight: '22px',
                            color: '#343434'
                          }}
                        >
                          Sun requirements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Filter */}
                <div className="flex flex-row justify-between items-center w-full shadow-[0px_8px_23px_#506b5221] bg-secondary-background border border-border-light rounded-md p-[12px]">
                  <h3 
                    className="text-2xl font-normal leading-3xl text-left text-accent-dark"
                    style={{
                      fontFamily: 'Open Sans',
                      fontSize: '20px',
                      fontWeight: '400',
                      lineHeight: '28px',
                      color: '#343434'
                    }}
                  >
                    Price
                  </h3>
                  <img 
                    src="/images/img_arrow_down_blue_gray_900.svg" 
                    alt="Expand price filter" 
                    className="w-[28px] h-[28px]"
                  />
                </div>

                {/* Include Choice Filters */}
                <div className="flex flex-col gap-[10px] justify-start items-start w-full h-auto shadow-[0px_8px_23px_#506b5221] bg-secondary-background rounded-md p-[16px]">
                  <h3 
                    className="text-2xl font-normal leading-[25px] text-left text-accent-dark mt-[8px]"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontWeight: '400',
                      lineHeight: '25px',
                      color: '#343434'
                    }}
                  >
                    Include
                  </h3>
                  <div className="flex flex-col w-full gap-[12px]">
                    <label className="flex items-center gap-[10px] w-auto cursor-pointer">
                      <input 
                        type="radio" 
                        name="include" 
                        className="w-4 h-4 text-primary-background"
                        onChange={() => handleFilterChange('planter')}
                      />
                      <span 
                        className="text-md font-normal leading-lg text-left text-accent-dark"
                        style={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: '22px',
                          color: '#343434'
                        }}
                      >
                        Planter
                      </span>
                    </label>
                    <label className="flex items-center gap-[10px] w-auto cursor-pointer">
                      <input 
                        type="radio" 
                        name="include" 
                        className="w-4 h-4 text-primary-background"
                        onChange={() => handleFilterChange('flowers')}
                      />
                      <span 
                        className="text-md font-normal leading-lg text-left text-accent-dark"
                        style={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: '22px',
                          color: '#343434'
                        }}
                      >
                        Flowers
                      </span>
                    </label>
                    <label className="flex items-center gap-[10px] w-auto cursor-pointer">
                      <input 
                        type="radio" 
                        name="include" 
                        className="w-4 h-4 text-primary-background"
                        onChange={() => handleFilterChange('care')}
                      />
                      <span 
                        className="text-md font-normal leading-lg text-left text-accent-dark"
                        style={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: '22px',
                          color: '#343434'
                        }}
                      >
                        Care
                      </span>
                    </label>
                    <label className="flex items-center gap-[10px] w-auto cursor-pointer">
                      <input 
                        type="radio" 
                        name="include" 
                        className="w-4 h-4 text-primary-background"
                        onChange={() => handleFilterChange('heatPack')}
                      />
                      <span 
                        className="text-md font-normal leading-lg text-left text-accent-dark"
                        style={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: '22px',
                          color: '#343434'
                        }}
                      >
                        Heat pack
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex-1 lg:w-[78%] self-center ml-0 lg:ml-[82px]">
                {loading ? (
                  <p>Loading plants...</p>
                ) : filteredProducts.length === 0 ? (
                  <p>No plants found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex flex-col gap-[14px] justify-start items-center w-full h-auto shadow-[0px_8px_23px_#506b5221] bg-secondary-background rounded-xl p-[20px] hover:shadow-lg transition-shadow"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full rounded-base object-cover"
                          style={{ width: '242px', height: '174px' }}
                        />
                        <div className="flex flex-col justify-start items-start w-full px-[8px]">
                          <h3 className="text-2xl font-bold text-accent-dark">
                            {product.name}
                          </h3>
                          <p className="text-2xl font-normal text-center text-accent-dark">
                            {product.price}
                          </p>
                        </div>

                        {/* Buy Button */}
                        <Button
                          text="Buy"
                          text_font_size="20"
                          text_font_family="Open Sans"
                          text_font_weight="700"
                          text_line_height="28px"
                          text_text_align="center"
                          text_text_transform="none"
                          text_color="#ffffff"
                          fill_background_color="#50806b"
                          border_border="none"
                          border_border_radius="8px"
                          effect_box_shadow="0px 8px 23px #506b5221"
                          layout_width="100%"
                          layout_align_self="stretch"
                          position="static"
                          variant="default"
                          size="medium"
                          className="w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); 
                            navigate(`/product/${product.id}`);
                          }}
                          margin="0px"
                          padding="16px 0px"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Shop;
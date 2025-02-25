const floatingChars = document.querySelectorAll('.floating-char');
const mainContainer = document.querySelector('.main-container');
const pageTitle = document.querySelector('h1');
const pageSubtitle = document.querySelector('h2');
const contextBox = document.querySelector('.context-box');

// content for each area with images
const areaContent = {
    1: {
        title: "Route 1: 熊猫基地 (Panda Base) – 建设路 (Jianshe Road) – 东郊记忆 (Eastern Suburb Memory)",
        introduction: "A journey through the heart of traditional Chengdu, where every corner tells a story.",
        sections: [
            {
                heading: "Panda Base",
                content: "The Panda Base has always been a nostalgic spot for me, reminding me of school trips filled with excitement. As a child, seeing pandas up close felt magical, and even now, I can’t help but feel a sense of wonder watching them play.",
                images: [
                    {
                        url: "images/panda1.jpg",
                        caption: "Me feeding the panda"
                    },
                    {
                        url: "images/panda2.jpg",
                        caption: "Panda playing"
                    }
                ],
            },
            {
                heading: "Jianshe Road",
                content: "Jianshe Road is my go-to place for an authentic local vibe. It’s not just about food; it’s about the memories of countless evenings spent chatting with friends over spicy snacks. For me, this street represents the heartbeat of the city’s youth culture.",
                images: [
                    {
                        url: "images/jianshe1.jpg",
                        caption: "Jianshe Road"
                    },
                    {
                        url: "images/jianshe2.jpg",
                        caption: "Street food vendors"
                    }
                ],
            },
            {
                heading: "Eastern Suburb Memory",
                content: "Walking through Eastern Suburb Memory feels like stepping into a different era, where old factories transform into artsy spaces. I love coming here to reflect and get inspired. The industrial architecture mixed with modern art installations always sparks my creativity.",
                images: [
                  {
                      url: "images/dongjiao.jpg",
                      caption: "Eastern Suburb Memory"
                  },
              ],
            }
        ],

    },
    2: {
        title: "Route 2: 文殊院 (Wenshu Monastery) – 天府广场 (Tianfu Square) – 人民公园 (People’s Park)",
        introduction: "Explore the contemporary side of Chengdu.",
        sections: [
            {
                heading: "Wenshu Monastery",
                content: "The peaceful atmosphere and the faint scent of incense offer a much-needed escape from the city’s fast pace. My favorite part? Sipping tea under the ancient trees, listening to the murmur of visitors. It’s where I go to slow down.",
                image: {
                    url: "images/wenshu.jpg",
                    caption: "Taikoo Li shopping district"
                }
            },
            {
                heading: "Tianfu Square",
                content: "Tianfu Square is where modern Chengdu meets its historical legacy. I remember coming here as a child, staring in awe at the giant Mao statue. My middle school was right next to Tianfu Square, and it became a familiar landmark during my daily routines. Passing by it every day, I watched the city evolve around it, blending the old with the new.",
                image: {
                  url: "images/tianfu.jpg",
                  caption: "Taikoo Li shopping district"
              }
            },
            {
                heading: "People’s Park",
                content: "I love watching elderly couples dancing, people practicing tai chi, and locals singing karaoke without a care in the world. The “matchmaking corner” always amuses me – a true glimpse into Chengdu’s community spirit. Every time I visit, I feel the city’s warmth and vibrancy.",
                images: [
                {
                    url: "images/renmin1.jpg",
                    caption: "People’s Park"
                },
                {
                    url: "images/renmin2.jpg",
                    caption: "Street food vendors"
                }
            ],
              
            }
        ],
    },
    3: {
        title: "Route 3: 太古里 (Taikoo Li) – 宽窄巷子 (Kuan Zhai Alley) – 九眼桥 (Jiuyanqiao)",
        introduction: "Discover the rich cultural heritage of Chengdu.",
        sections: [
            {
                heading: "Taikoo Li",
                content: "I love the juxtaposition of luxury boutiques nestled in traditional courtyard architecture. It’s where I go to feel Chengdu’s modern pulse, sipping coffee while people-watching. The energy here is contagious, reflecting the city’s chic and cosmopolitan side.",
                image: {
                    url: "images/taiguli.jpg",
                    caption: "Taikoo Li"
                }
            },
            {
                heading: "Kuan Zhai Alley",
                content: "Walking through Kuan Zhai Alley feels like a stroll through history. The narrow alleys, with their preserved Qing Dynasty architecture, always make me feel connected to Chengdu’s past. I especially love the artisan shops with handcrafted souvenirs – they remind me of family outings and the joy of discovering unique trinkets.",
                image: {
                  url: "images/kuanzhai.jpg",
                  caption: "Kuanzhai Alley"
              }
            },
            {
                heading: "Jiuyanqiao",
                content: "Jiuyanqiao is my favorite spot to experience Chengdu’s nightlife. The bars lining the riverside come alive with neon lights and live music. I’ve spent countless evenings here with friends, laughing, singing, and making unforgettable memories.",
                image: {
                  url: "images/jiuyanqiao.jpg",
                  caption: "Jiuyanqiao"
              }
            }
        ],
    },
    4: {
        title: "Route 4: 四川博物馆 (Sichuan Museum) – 锦里 (Jinli) – 杜甫草堂 (Du Fu Thatched Cottage) – 武侯祠 (Wuhou Shrine)",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        sections: [
          {
              heading: "Sichuan Museum",
              content: "Sichuan Museum is where I go to reconnect with my cultural roots. From ancient relics to exquisite Sichuan embroidery, each exhibit feels like a piece of home. It’s a reminder of the rich history and heritage that I carry with me.",
              image: {
                  url: "images/museum.jpg",
                  caption: "Sichuan Museum"
              }
          },
          {
              heading: "Jinli",
              content: "Jinli’s bustling streets are always full of life. The colorful lanterns, street performances, and aroma of local snacks create a festive atmosphere. It reminds me of childhood visits during Chinese New Year.",
              image: {
                url: "images/jinli.jpg",
                caption: "Jinli"
            }
          },
          {
              heading: "Du Fu Thatched Cottage",
              content: "Visiting Du Fu’s Thatched Cottage is like stepping into a poet’s dream. I always feel a sense of calm walking through the lush gardens, imagining Du Fu composing poems under the ancient trees.",
              image: {
                url: "images/dufu.jpg",
                caption: "Du Fu Thatched Cottage"
            }
          }
      ],
    },
    5: {
        title: "Route 5: 玉林路 (Yulin Road) – 锦城印象火锅 (Jincheng Impression Hotpot) – 双子塔 (Twin Towers)",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        sections: [
          {
              heading: "Yulin Road",
              content: "Yulin Road feels like the epitome of Chengdu’s laid-back lifestyle. It’s a place where old meets new, with cozy teahouses beside modern cafes. I love the artistic vibe, surrounded by murals and indie music.",
              image: {
                  url: "images/yulin.jpg",
                  caption: "Yulin Road"
              }
          },
          {
              heading: "Jincheng Impression Hotpot",
              content: "No journey through Chengdu is complete without hotpot, and Jincheng Impression Hotpot is my all-time favorite. I’ve spent countless evenings here with friends and family, laughing over spicy broths and daring each other to eat the fieriest peppers.",
              image: {
                url: "images/hotpot.jpg",
                caption: "Jincheng Impression Hotpot"
            }
          },
          {
              heading: "Twin Towers",
              content: "The Twin Towers are a symbol of Chengdu’s rapid modernization. I remember the first time I saw them, towering above the cityscape with their sleek, futuristic design. It felt surreal to witness how fast the city was growing.",
              image: {
                url: "images/twin.jpg",
                caption: "Twin Towers"
            }
          }
        ],
    }
};

let isFirstClick = true;

// area clicks
document.querySelectorAll('area').forEach(area => {
    area.addEventListener('click', (e) => {
        e.preventDefault();
        
        const areaNumber = area.getAttribute('alt');
        document.querySelectorAll('.image-container img').forEach(img => img.classList.remove('active'));
        document.getElementById(`image${areaNumber}`).classList.add('active');
        
        if (isFirstClick) {
            floatingChars.forEach(char => char.style.display = 'none');
            mainContainer.classList.add('shifted');
            pageTitle.classList.add('shifted');
            pageSubtitle.classList.add('shifted');
            isFirstClick = false;
        }
        
        const content = areaContent[areaNumber];
        let contentHTML = `<h3 class="context-title">${content.title}</h3>`;
        
        if (content.subtitle) {
            contentHTML += `<h4 class="context-subtitle">${content.subtitle}</h4>`;
        }
        
        if (content.mainImage) {
            contentHTML += `
                <div class="main-image-container">
                    <img src="${content.mainImage.url}" alt="${content.title}" class="main-image">
                    <p class="image-caption">${content.mainImage.caption}</p>
                </div>
            `;
        }
        
        if (content.introduction) {
            contentHTML += `<p class="context-intro">${content.introduction}</p>`;
        }
        
        if (content.text) {
            contentHTML += `<p class="context-text">${content.text}</p>`;
        }
        
        if (content.sections && Array.isArray(content.sections)) {
            contentHTML += content.sections.map(section => {
                let sectionHTML = `<div class="section">`;
                if (section.heading) sectionHTML += `<h5 class="section-heading">${section.heading}</h5>`;
                if (section.content) sectionHTML += `<p class="section-content">${section.content}</p>`;
                
                if (section.images && Array.isArray(section.images)) {
                    sectionHTML += `<div class="section-images">` +
                        section.images.map(image => `
                            <div class="image-wrapper">
                                <img src="${image.url}" alt="${image.caption}" class="section-image">
                                <p class="image-caption">${image.caption}</p>
                            </div>
                        `).join('') +
                    `</div>`;
                } else if (section.image) {
                    sectionHTML += `
                        <div class="section-image-container">
                            <img src="${section.image.url}" alt="${section.image.caption}" class="section-image">
                            <p class="image-caption">${section.image.caption}</p>
                        </div>`;
                }
                
                if (section.highlights && Array.isArray(section.highlights)) {
                    sectionHTML += `<ul class="highlights">` +
                        section.highlights.map(highlight => `<li>${highlight}</li>`).join('') +
                    `</ul>`;
                }
                sectionHTML += `</div>`;
                return sectionHTML;
            }).join('');
        }
        
        if (content.galleryImages && Array.isArray(content.galleryImages)) {
            contentHTML += `
                <div class="gallery-section">
                    <h5>Photo Gallery</h5>
                    <div class="gallery-grid">
                        ${content.galleryImages.map(image => `
                            <div class="gallery-item">
                                <img src="${image.url}" alt="${image.caption}" class="gallery-image">
                                <p class="image-caption">${image.caption}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
      
        
        
        // update the context box with the generated HTML
        contextBox.innerHTML = contentHTML;
        contextBox.classList.add('active');
    });
});

document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'AREA') {
        document.querySelectorAll('.image-container img').forEach(img => img.classList.remove('active'));
        document.getElementById('defaultImage').classList.add('active');
    }
});


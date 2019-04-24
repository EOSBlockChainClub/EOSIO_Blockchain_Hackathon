(function() {
    angular.module('blockchain.components').directive('about', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../components/main/about/about.html',
            controller: controller,
            controllerAs: 'vm',
        };
    }

    function controller($scope) {
        let vm=this;
        $scope.abouttext = "The vision of eco10gic lies at the intersection of ecology and technology. We leverage ecological psychology, the influence of environment on human behavior, along with digital tools to help our species live more lightly on this earth. Intuitive design makes even the most sustainable choices seem like common sense. We are a team of mostly undergraduate students at Virginia Tech led by  a diverse group of graduate students and faculty advisors at the forefront of their respective fields. "

        $scope.timelineNarrative = "A sneakpeek into our journey"
        $scope.timelineObjects = [{
            img: "resources/img/about/1.jpg",
            heading: "Our Humble Beginnings",
            time: "October-2018",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
            inverted: false
        },{
            img: "resources/img/about/prototype.jpg",
            heading: "A prototype is born",
            time: "December-2018",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
            inverted: true
        },{
            img: "resources/img/about/3.jpg",
            heading: "Transition to full-scale design",
            time: "January-2019",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
            inverted: false
        },{
            img: "resources/img/about/completion.jpg",
            heading: "Product Completion",
            time: "March-2019",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
            inverted: true
        },{
            img: "resources/img/about/decathlon.jpg",
            heading: "Beginning of a new chapter",
            time: "April-2019",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
            inverted: false
        },{
            img: "resources/img/about/today.png",
            heading: "Be part of the narrative",
            time: "",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
            inverted: true
        }];

        $scope.partnershipInfo = [{
            heading: "Partnerships",
            headingText: "Our partners from both industry and academia are the fuel that will make TreeHAUS real. With their help we have been able to design a breakthrough building actually capable of being built and paved a pathway to its construction here in Blacksburg and beyond. ",
            partnershipInfo: []
        },{
            heading: "Industry",
            headingText: "",
            partnershipInfo: [{
                img:"resources/img/graphics/sponsor1.jpg",
                name: "Southland Log Homes",
                text: "Southland Log Homes is the largest log home manufacturer in North America. They helped us to apply their kit-of-parts timber fabrication and construction techniques to help optimize our design for scalability. They also helped us conceive and cost out our hybrid mass timber approach for affordable multi-family housing."
            },{
                img:"resources/img/graphics/sponsor2.png",
                name: "Green KW Energy Inc.",
                text: "GkW Energy is a local renewable Energy Company that helped us conceive our back-up energy generation scheme with the anaerobic digestion of food waste into fuel for a bio-gas combined heat and power system. They also helped us navigate all of our grid integration challenges by connecting us directly with the local utilities."
            },{
                img:"resources/img/graphics/acentech.jpeg",
                name: "Acentech",
                text: "Acentech came out to Blacksburg to help us take an extended recording of the audio spectrum around our site and identify key spectra for attenuation. A consultant of theirs sat down with our team to analyze the data in relationship to our design and present acoustic strategies for ultimate sonic comfort at a reasonable price. "
            }]
        },{
            heading: "University",
            headingText: "",
            partnershipInfo: [{
                img:"resources/img/graphics/vt_crc.png",
                name: "Virginia Tech Corporate Research Center",
                text: "Virginia Tech Corporate Research Center is an industrial park that houses many of Blacksburg's leading businesses. They currently manage the property on which TreeHAUS will be built and advised us on how to best introduce residential development into the area. They also guided our project into consistency with their long term development goals. "
            },{
                img:"resources/img/graphics/propulsion_lab.png",
                name: "Advanced Propulsion and Power Lab",
                text: "Advanced Power and Propulsion Lab is an academic facility next to our proposed site that gave us valuable insight into their operation, their existing utility connections, their sources of noise pollution and waste heat, and their willingness to purchase energy from TreeHAUS in the case of overproduction. They also aided in the design of our flex-fuel gas hot water heaters and CHP generator."
            },{
                img:"resources/img/graphics/vt_foundation.png",
                name: "Virginia Tech Foundation",
                text: "Virginia Tech Foundation owns the land on which the TreeHAUS will be built. Their CEO sat down with our team and gave us the whole history of our site in addition to a strategy for incentivizing capital gains investment through the Opportunity Zones program."
            }]
        }] ;


        $scope.solarDecathlonText = "TreeHAUS was initially conceived by a team of Virginia Tech students as an entry in the 2019 Solar Decathlon Design Competition run by the U.S. Department of Energy. For the first time ever, the Solar Decathlon broadened its scope to include the design of larger residential and commercial development. The TreeHAUS team took advantage. Though the project began as a conceptual design, the hope is now to construct the graduate student housing project as part of a Living Lab program spearheaded through Virginia Tech's College of Architecture and Urban Studies (CAUS). We are in the process of garnering the institutional and financial support to make the TreeHAUS come to life. "
        $scope.initiationText = "The TreeHAUS is a net-positive, regenerative attached housing project inspired by the way trees collect and distribute resources in the forest. The goal of the project is to strengthen the surrounding environment and Blacksburg municipality by imagining the house as a cooperative constituent of its contextual ecology. The TreeHAUS will harness energy from the sun, harvest water from the rain,and cycle resources and information throughout its community in the same way that plants and trees do in nature. Our design will be the first residential building in a proposed Live/Work/Learn village at the Virginia Tech Corporate Research Center (VTCRC). According to the recently released Campus Master Plan, Virginia Tech will drastically increase enrollment and add seven million gross square feet (GSF) to its campus by 2047 (including over one million GSF in the next five years). This has caused widespread speculation in Blacksburg, skyrocketing real estate prices, and a local affordability crisis especially for under-paid graduate students lacking outside financial assistance. The aim of our project is to provide the burgeoning graduate student population an affordable, sustainable home where they can grow into future faculty and industry leaders."
        // $scope.partnershipText = "Our partners from both industry and academia are the fuel that will make TreeHAUS real. With their help we have been able to design a breakthrough building actually capable of being built and paved a pathway to its construction here in Blacksburg and beyond. ";

        $scope.awardsInfo = [{
            heading: "Awards",
            headingText: "Highlights of our journey uptil now",
            partnershipInfo: [{
                img:"resources/img/graphics/eosio_challenge.jpg"
            },{
                img:"resources/img/graphics/certificate.png",
                name: "EOSIO VT Challenge Winners",
                text: "The team was awarded the first place in the design phase of the challenge, thus providing Mycorrho-grid idea validation"
            },{
                img:"resources/img/graphics/poweredeosio.png"
            }]

        }];
    }
})()
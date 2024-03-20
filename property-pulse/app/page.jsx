import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import HomeProperties from "@/components/HomeProperties"
import InfoBoxes from "@/components/InfoBoxes"
import PropertyFeatured from "@/components/PropertyFeatured"

const HomePage = async () => {
	return (
		<>
			<Hero/>
			<PropertyFeatured/>
			<InfoBoxes/>
			<HomeProperties/>
		</>
    )
}

export default HomePage

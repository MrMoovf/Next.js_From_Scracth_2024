import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import HomeProperties from "@/components/HomeProperties"
import InfoBoxes from "@/components/InfoBoxes"

const HomePage = async () => {
	return (
		<>
			<Hero/>
			<InfoBoxes/>
			<HomeProperties/>
			<Footer/>
		</>
    )
}

export default HomePage

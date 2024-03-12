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
			<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4qMBuq9LoKQb7thBpQltiN?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
		</>
    )
}

export default HomePage

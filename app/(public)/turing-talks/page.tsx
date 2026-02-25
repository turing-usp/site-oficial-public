    import tt from './action';
    import TuringTalksClient from './turingtalks-client';

    export default async function TuringTalks(){
        const {error, success, artigos} = await tt();

        if (!success || !artigos) {
            return <div>Erro ao carregar artigos</div>;
        }

        return <TuringTalksClient artigos={artigos} />;
    }
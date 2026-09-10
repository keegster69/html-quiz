// Rebuild the standalone exam from the existing notebook and the supplied text.
const fs = require('node:fs');
const sourcePath = process.argv[2] || 'Practice-exam.txt';
const source = fs.readFileSync(sourcePath, 'utf8')
  .replace(/BIOL 130 Practice Exam \d+/g, '')
  .replaceAll('2311Na','²³₁₁Na').replaceAll('168O','¹⁶₈O').replaceAll('188O','¹⁸₈O')
  .replace(/[\uE000-\uF8FF]/g, '').replaceAll('à','→');
const key = {
  1:['d','Robert Hooke is the specified answer for this practice exam.'],
  2:['c','All cells have genetic material, ribosomes, and a plasma membrane. Cell walls and nuclei are not universal.'],
  3:['c','Animal cells lack chloroplasts. Plant cells have mitochondria, a Golgi apparatus, and a plasma membrane as well as a cell wall.'],
  4:['c','Secreted proteins travel through the endoplasmic reticulum and Golgi apparatus before vesicles deliver them to the plasma membrane.'],
  5:['b','Endocytosis brings extracellular material into the cell in membrane-bound vesicles.'],
  6:['b','Carbon, hydrogen, nitrogen, and oxygen account for nearly all atoms in cells. B is the intended approximate statement; exact proportions vary with cell type and composition.'],
  7:['c','Electrons, especially valence electrons in the outer shell, determine most chemical bonding behavior.'],
  8:['b','Neutral sodium has 11 electrons arranged 2, 8, 1, giving it one valence electron. The mass number 23 does not change this.'],
  9:['c','C is the expected simplified ranking. Covalent bonds are strong; individual ionic and hydrogen-bond interactions are weaker in water. Their relative strengths depend strongly on solvent, geometry, and environment, so this is not a universal ordering.'],
  10:['a','The oxygen–hydrogen bonds in water are polar because oxygen attracts the shared electrons more strongly. Bonds in O2 and N2 are nonpolar; C–H bonds are generally treated as nonpolar in introductory biology.'],
  11:['c','These oxygen isotopes have the same atomic number, so they have the same number of protons. Oxygen-18 has two more neutrons than oxygen-16.'],
  12:['c','Sodium loses an electron to chlorine, producing Na+ and Cl−. The nuclei do not change.'],
  13:['c','A hydrogen bond is a noncovalent attraction between a partially positive hydrogen bonded to an electronegative atom and an electronegative acceptor. Option C is the closest description; acceptors need not themselves participate in a polar covalent bond.'],
  14:['d','Equilibrium bond length depends on the bonded atoms and occurs where attractive and repulsive forces balance. Attraction between valence electrons is not the cause: electrons repel one another.'],
  15:['e','Each decrease of one pH unit means ten times the hydrogen ion concentration. A decrease from 7 to 5 means 100 times as much.'],
  16:['b','Water autoionization transfers a proton between two water molecules: 2H2O ⇌ H3O+ + OH−. B shows the balanced hydronium form; A is common shorthand using H+.'],
  17:['c','Sugar is an organic carbon compound. Water and sodium chloride are inorganic, regardless of how they are sold or produced.'],
  20:['c','Leucine has a nonpolar side chain, serine has a polar hydroxyl group, and glutamate has a negatively charged side chain near pH 7: Leu > Ser > Glu.'],
  21:['a','The amino group of a free amino acid is predominantly protonated as –NH3+ near pH 7, giving that group a positive charge.'],
  22:['c','L and D amino acids differ in stereochemical arrangement around the α-carbon. Glycine is achiral and has no L/D pair.'],
  23:['e','A peptide bond is a covalent linkage between a carboxyl carbon and an amino nitrogen. Its net formation is represented as a condensation reaction.'],
  24:['b','Hydrogen bonds between peptide backbone carbonyl and amino groups stabilize α-helices and β-sheets.'],
  25:['e','Tertiary structure is stabilized by several noncovalent interactions, including electrostatic interactions, hydrogen bonds, and hydrophobic effects.'],
  26:['d','Denaturation disrupts a protein’s secondary and tertiary structures while generally leaving the peptide-bond sequence, or primary structure, intact.'],
  28:['d','The α and β anomers differ in the orientation of the hydroxyl group on the anomeric carbon of cyclic glucose.'],
  30:['c','Animals generally lack cellulase, which breaks β-1,4 linkages. Their digestive enzymes can break the α-1,4 linkages in starch; cellulose-digesting animals rely on microbial partners.'],
  31:['c','A nucleoside contains a sugar and nitrogenous base. Adding one or more phosphate groups makes it a nucleotide.'],
  32:['c','The strands are complementary and antiparallel: 5′-TGAC-3′ pairs with 3′-ACTG-5′, which is 5′-GTCA-3′ when written 5′ to 3′.'],
  33:['d','Nucleic acid backbones contain phosphodiester linkages joining the 3′ hydroxyl of one sugar to the 5′ phosphate associated with the next nucleotide.'],
  34:['c','Polymerases use nucleoside triphosphates: NTPs for RNA and deoxynucleoside triphosphates for DNA. Pyrophosphate is released as each nucleotide is incorporated.'],
  35:['b','DNA strands are antiparallel, with A–T and C–G hydrogen-bonded base pairs. Base stacking also contributes substantially to double-helix stability.'],
  36:['b','Both RNA and DNA have phosphodiester-linked sugar–phosphate backbones. RNA uses ribose, while DNA uses deoxyribose.'],
  37:['e','The text states that products have lower free energy, so ΔG is negative and the reaction is exergonic. An appropriate catalyst increases the reaction rate without changing ΔG. The figure is not needed for these conclusions.'],
  40:['d','A drug occupying the enzyme’s active site competes with substrate binding, making this competitive inhibition.'],
  41:['a','Enzymes lower activation energy without changing the reaction equilibrium or overall free-energy difference. They catalyze both forward and reverse reactions; A is the best available option.'],
  42:['b','At high substrate concentration the enzyme active sites are saturated, so reaction rate approaches its maximum.'],
  44:['e','In eukaryotic cells, pyruvate enters the mitochondrial matrix and undergoes oxidative decarboxylation to acetyl CoA for entry into the TCA cycle.'],
  45:['c','The simplified net aerobic respiration equation is C6H12O6 + 6O2 → 6CO2 + 6H2O, releasing energy captured partly as ATP.'],
  46:['d','Coenzyme A carries the two-carbon acetyl group in a reactive thioester linkage, allowing transfer to oxaloacetate at entry into the TCA cycle.'],
  47:['e','Much of the extracted energy is carried by reduced electron carriers, especially NADH, before electron transport and oxidative phosphorylation.'],
  48:['d','In cellular respiration, the electron transport chain reduces oxygen to water at its terminal complex. The respiration context supplies the information needed here.'],
  49:['b','The labeled carbon atoms from glucose are released as carbon dioxide during pyruvate oxidation and the TCA cycle.'],
  50:['e','Fermentation regenerates NAD+ by transferring electrons to an organic acceptor. This sustains glycolysis and permits some tissues to function when oxygen is limited.'],
  52:['b','RNA polymerase reads the template strand 3′ to 5′ and synthesizes RNA 5′ to 3′.'],
  53:['b','The initial RNA transcript matches the coding (non-template) strand, with U in place of T. It is complementary to the template strand.'],
  54:['c','Sigma first associates with RNA polymerase; the holoenzyme recognizes the promoter, DNA opens, RNA synthesis begins, and sigma is released in the standard introductory model: 3, 1, 2, 5, 4.'],
  55:['a','In intrinsic bacterial termination, an RNA hairpin together with an adjacent U-rich sequence promotes pausing and destabilization of the transcription complex.'],
  56:['b','B is the specified answer: promoter consensus sequences are conventionally written using the non-template strand. RNA synthesis proceeds 5′ to 3′.'],
  57:['d','D is the expected introductory-course answer for standard eukaryotic mRNA processing: a 5′ methylguanosine cap and a stabilizing 3′ poly(A) tail. Bacterial RNAs can also be polyadenylated, often in connection with degradation, so the wording is simplified. Sigma factor is bacterial.'],
  58:['e','A correctly charged tRNA carries the amino acid specified by its anticodon, which pairs with the mRNA codon. Aminoacyl-tRNA synthetases ensure correct loading.'],
  59:['c','A release factor recognizes a stop codon that has no corresponding standard aminoacyl tRNA, triggering release of the completed polypeptide.'],
  60:['a','Introns are removed from RNA during splicing. Proteolysis, glycosylation, and phosphorylation modify proteins after translation.'],
  61:['b','Prokaryotes can translate an RNA while it is still being transcribed because transcription and translation are not separated by a nuclear envelope.'],
  62:['d','Lipids and many proteins diffuse laterally. Spontaneous phospholipid movement between leaflets is rare, while transmembrane proteins retain their orientation.'],
  63:['e','E is the likely introductory-course answer: leaflets differ in phospholipid composition, and carbohydrates face outward. The similar-cholesterol statement is a simplification; actual cholesterol distribution is debated and depends on the membrane. No official answer key was supplied.'],
  64:['b','Unsaturated fatty acids have kinks that reduce tight packing and help membranes remain fluid in cold conditions.'],
  65:['c','Nonpolar amino acids interact with the membrane interior, while polar regions interact with water or polar head groups.'],
  69:['c','Carriers bind solute and change conformation, causing saturable transport. Open channels permit much faster ion passage down an electrochemical gradient.'],
  70:['c','The sodium–glucose symporter uses the sodium gradient maintained by the Na+/K+ ATPase. Glucose uptake therefore depends indirectly on ATP.'],
  71:['d','The bacterial cell wall resists the pressure generated by osmotic water entry and helps prevent lysis.'],
  72:['b','The extensive network of endoplasmic reticulum accounts for a large portion of a typical eukaryotic cell’s membrane surface area.'],
  73:['b','Without its ER targeting signal, this protein would remain in the cytosol unless it carries another targeting signal.'],
  74:['d','Small particles can passively diffuse through nuclear pore complexes; a nuclear localization signal is needed for selective import of larger cargo.'],
  75:['d','The conventional glycolytic enzyme phosphofructokinase functions in the cytosol and does not need an ER signal or nuclear localization sequence.'],
  76:['a','Nuclear RNA polymerases are synthesized by free cytosolic ribosomes, then imported into the nucleus.'],
  77:['d','During exocytosis the vesicle membrane fuses with the plasma membrane and becomes part of it. Membrane can subsequently be retrieved by endocytosis.'],
  78:['b','Carbohydrates are added on the luminal side of the ER and Golgi. That side becomes extracellular when a vesicle fuses with the plasma membrane.'],
  79:['b','Membrane topology is preserved during vesicle transport: a domain facing the cytosol at the ER continues to face the cytosol at the Golgi and plasma membrane.'],
  80:['b','Paracrine signals act locally on nearby cells, whereas endocrine hormones typically circulate to distant targets.'],
  81:['d','Signal reception and relay involve changes in protein conformation or activity. The listed second messengers and phosphorylation events are not universal to every pathway.'],
  82:['c','Second messengers relay and often amplify a signal inside the cell after receptor activation. They are distinct from the extracellular signaling molecule.'],
  83:['c','The GPCR receives the extracellular glucagon signal. Cyclic AMP is the intracellular second messenger generated downstream.'],
  84:['b','Receptor activation promotes GDP–GTP exchange on Gα, followed by subunit separation and activation of adenylyl cyclase: 2, 4, 3, 1.'],
  85:['e','IP3 binds receptors on the ER membrane, opening channels that release stored calcium into the cytosol.'],
  86:['c','Calcium binding activates calmodulin, which regulates downstream targets including calmodulin-dependent kinases.'],
  87:['c','Typical receptor tyrosine kinases dimerize and phosphorylate tyrosines on their cytosolic regions, creating docking sites for signaling proteins.'],
  88:['c','Small G proteins such as Ras act downstream of receptor tyrosine kinases. Both small G proteins and the Gα subunit of trimeric G proteins bind GTP and have GTPase activity, so E is not a distinguishing feature.'],
  89:['c','During most of interphase, chromosomes are relatively decondensed and are not distinguishable as individual condensed structures by ordinary light microscopy.'],
  90:['e','Mitotic anaphase separates sister chromatids, which are replicated copies of the same chromosome. Homologous chromosomes separate during meiosis I.'],
  91:['c','Nuclear envelope breakdown marks the transition into prometaphase in typical animal cells.'],
  92:['c','Meiosis II separates sister chromatids. Homolog pairing, crossing over, and separation of homologs occur in meiosis I.'],
  93:['c','Most of the cell cycle is interphase, comprising G1, S, and G2. Mitosis is usually a much shorter portion.'],
  94:['c','A G0 somatic cell has 2n chromosomes and 2C DNA. After meiosis I, each daughter cell has n duplicated chromosomes and 2C DNA: the same DNA amount and half the chromosome number.'],
  95:['e','Cdks transfer phosphate groups to target proteins and their activity varies during the cell cycle. Cyclin abundance typically oscillates more than Cdk protein abundance.'],
  96:['d','APC/C promotes ubiquitination and degradation of mitotic cyclin. Loss of cyclin reduces M-Cdk activity and allows mitotic exit.'],
  97:['d','In the introductory model, a terminally differentiated cell has a specialized function and permanently exits the cell cycle. A and B describe that state.'],
  98:['e','Cdk inhibitors can bind and inhibit G1/S-Cdk complexes, preventing entry into S phase, including in response to DNA damage.'],
  99:['e','Tumor suppressor pathways can halt the cell cycle when DNA is damaged. For example, p53 promotes expression of the Cdk inhibitor p21.'],
  100:['d','Proto-oncogenes have normal roles in regulated growth and division. Activating mutations or abnormal expression can convert them into oncogenes.'],
  101:['d','Rb is a tumor suppressor that restrains progression through the cell cycle, in part by controlling E2F transcription factors.'],
  102:['b','An inherited nonfunctional TP53 allele can increase susceptibility to cancer by compromising a tumor-suppressor pathway. It does not mean cancer or uncontrolled division is inevitable.'],
  103:['c','The spindle checkpoint delays anaphase until chromosomes are properly attached, helping prevent segregation errors such as nondisjunction.'],
  104:['e','Irreparable damage can activate intrinsic apoptosis: pro-apoptotic Bcl-2 family proteins promote mitochondrial cytochrome c release, leading to caspase activation.'],
  105:['d','Actin is the expected answer among these choices and is highly abundant in many animal cells. The most abundant protein can vary with cell type.'],
  106:['d','Desmosomes connect to keratin intermediate filaments in epithelial cells, providing mechanical strength.'],
  107:['e','The mitotic spindle depends on microtubules. Inhibiting their polymerization disrupts chromosome segregation and blocks normal mitosis.'],
  108:['a','Microtubules and ATP-powered kinesin support outward vesicle transport. Actin and myosin can also contribute near the cell cortex, but A is the expected long-range transport answer.'],
  109:['c','Different actin-binding accessory proteins organize, stabilize, cross-link, and move along actin filaments, enabling diverse functions.'],
  110:['d','Actin polymerization and actomyosin forces are central to crawling motility in animal cells without cilia or flagella.'],
  111:['b','Plant cell walls are rich in carbohydrate polymers such as cellulose. Animal extracellular matrix contains substantial protein, including collagen, along with carbohydrate-containing components.'],
  112:['b','Gap junctions permit ion movement between neighboring cardiac muscle cells, supporting electrical coupling. They do not make the ER or plasma membranes continuous.'],
  113:['d','Desmoglein is part of desmosomal cell–cell adhesion. Disrupting it weakens attachment between epithelial cells and produces blistering.'],
  114:['a','Integrins are transmembrane receptors that link extracellular matrix interactions to the cytoskeleton and intracellular signaling pathways.'],
  115:['d','Reduced fibronectin-mediated attachment is consistent with cancer cells detaching, invading, and spreading away from the original tumor.']
};
// The source sometimes joins question numbers directly to the previous sentence.
// Accept increasing question numbers; smaller numbered pathway steps remain in the prompt.
let previousNumber = 0;
const boundaries = [...source.matchAll(/(?<!\d)(\d{1,3})\.\s*(?=[A-Za-z])/g)].filter(match => {
  const number = Number(match[1]);
  if (number <= previousNumber || number > 115) return false;
  previousNumber = number;
  return true;
});
const sourceQuestions = boundaries.map((match,index) => {
  const number = match[1];
  const body = source.slice(match.index+match[0].length, boundaries[index+1]?.index ?? source.length).trim();
  const first = body.search(/\s[a-eA-E][.)]\s/);
  const options = [...body.slice(first).matchAll(/\s([a-eA-E])[.)]\s+(.*?)(?=\s[a-eA-E][.)]\s|$)/gs)].map(([,id,text])=>({id:id.toLowerCase(),text:`${id.toLowerCase()}. ${text.replace(/\s+/g,' ').trim()}`}));
  const answer = key[number];
  return {number:Number(number),prompt:body.slice(0,first).replace(/\s+/g,' ').trim(),options,correct:answer?.[0]||null,explanation:answer?.[1]||'',tag:`Source question ${number}`,note:answer?'':number==='1'?'The wording and choices do not give a reliable answer. Early compound microscopes are commonly attributed to the Janssens, who are absent from these options.':number==='56'?'Promoters are double-stranded DNA regions; their consensus sequences are conventionally written using the non-template strand. RNA is synthesized 5′ to 3′. The choices do not cleanly distinguish promoter convention from physical strand location, so this is left unscored.':'The referenced diagram or numbered figure was not included in the text file.'};
});
// Omit only questions whose answers depend on an absent image, as requested.
const imageDependentNumbers = [18,19,27,29,38,39,43,51,66,67,68];
const omittedNumbers = sourceQuestions.filter(q=>imageDependentNumbers.includes(q.number)).map(q=>q.number);
const questions = sourceQuestions.filter(q=>!imageDependentNumbers.includes(q.number));
if (!sourceQuestions.length || sourceQuestions.some(q=>q.options.length<4 || q.options.length>5 || (q.correct&&!q.options.some(o=>o.id===q.correct)))) throw Error('Question import validation failed');
const missingNumbers = Array.from({length:115},(_,i)=>i+1).filter(n=>!sourceQuestions.some(q=>q.number===n));
let original=fs.readFileSync('biology-review.html','utf8');
let page=original;
const homeStart=page.indexOf('if(e==="home")return');
const homeEnd=page.indexOf('if(e==="unit"&&n)',homeStart);
if(homeStart<0||homeEnd<0) throw Error('Notebook structure changed');
page=page.slice(0,homeStart)+`if(e==="home")return (0,d.jsxs)("div",{style:Et,children:[Lt,(0,d.jsx)(PracticeHome,{start:()=>It({kind:"practice",unit:null,topic:null,key:practiceProgressKey,title:"BIOL 130 Practice Exam",subtitle:"Practice-exam.txt"}),progress:O(practiceProgressKey)})]});`+page.slice(homeEnd);
page=page.replace('function yf(e){','function yf(e){if(e.kind==="practice")return Ps(practiceQuestions.filter(q=>q.correct),practiceQuestions.length,[]);');
page=page.replace('var Ei="bio701sc/"','var Ei="biol130-practice/"');
page=page.replace('Press 1\\u20134 to answer, Enter to continue','Press 1\\u20135 to answer, Enter to continue');
page=page.replace('Retest this topic','Retake practice exam').replaceAll('Back to notebook','Back to practice exam').replaceAll('Notebook home','Practice exam home');
page=page.replace('<title>Biology Review &mdash; MIT 7.01SC</title>','<title>BIOL 130 Practice Exam</title>').replace('Loading your review notebook','Loading your practice exam');
page=page.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/,'<nav aria-label="Quiz navigation" style="background:#141a1f;padding:10px 16px"><a href="biology-review.html" style="display:inline-block;color:#eef2f0;font:600 13px system-ui,sans-serif;text-decoration:none;padding:8px 14px;border:1px solid #3a454d;border-radius:999px">&larr; Biology review</a></nav>');
const home=fs.readFileSync('practice-exam-home.js','utf8');
page=page.replace('function Ws(){',`const practiceQuestions=${JSON.stringify(questions,null,2)};\nconst missingQuestionNumbers=${JSON.stringify(missingNumbers)};\nconst omittedImageQuestions=${JSON.stringify(omittedNumbers)};\nconst sourceQuestionCount=${sourceQuestions.length};\nconst practiceProgressKey="practice:biol130:"+practiceQuestions.map(q=>q.number+q.correct).join("-");\n${home}\nfunction Ws(){`);
fs.writeFileSync('biology-practice-exam.html',page);
if(!original.includes('href="biology-practice-exam.html"')){
  original=original.replace('<nav style="background:#141a1f;padding:10px 16px">','<nav aria-label="Quiz navigation" style="background:#141a1f;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">');
  original=original.replace('</a></nav>','</a><a href="biology-practice-exam.html" style="margin-left:auto;display:inline-block;color:#eef2f0;font:600 13px Inter,system-ui,-apple-system,\'Segoe UI\',sans-serif;text-decoration:none;padding:8px 14px;border:1px solid #3a454d;border-radius:999px">BIOL 130 Practice Exam &rarr;</a></nav>');
  fs.writeFileSync('biology-review.html',original);
}
console.log(`Read ${sourceQuestions.length} source questions; omitted ${omittedNumbers.length} requiring missing images; retained ${questions.length}: ${questions.filter(q=>q.correct).length} scored, ${questions.filter(q=>!q.correct).length} unscored.`);
console.log(`Missing source numbers: ${missingNumbers.join(', ') || 'none'}`);

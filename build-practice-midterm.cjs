// Reuse the standalone exam's tested UI; only the content and identity differ.
const fs = require('node:fs');
const source = fs.readFileSync('Practice-midterm.txt','utf8');
const answers = {
  1:['a','Both cell types organize DNA with proteins. Eukaryotic nuclear DNA is enclosed by a nuclear envelope; prokaryotes lack a membrane-bound nucleus.'],
  2:['b','Transparent nematodes such as C. elegans develop quickly and permit visualization of fluorescently tagged proteins in a nervous system. Yeast is eukaryotic.'],
  4:['a','The inside-out hypothesis proposes that archaeal protrusions expanded to help form eukaryotic compartments, including the nuclear envelope and ER. This is an explanatory model, not an established account of every step.'],
  5:['d','Adenosine contains adenine and ribose without phosphate. ATP is a nucleotide; deoxyadenosine has deoxyribose.'],
  6:['c','Complementary purine–pyrimidine hydrogen bonding supports antiparallel DNA pairing. Base stacking also contributes substantially to stability.'],
  7:['d','Comparing genomic sequences with the transcriptome reveals transcribed regions, including noncoding RNAs not represented in the proteome. D is the best available answer.'],
  9:['b','Protein families share evolutionary ancestry, often evident in related sequences, domains, and functions. Members need not have identical sequences or quaternary structures.'],
  10:['d','The genetic code is redundant because multiple codons can specify the same amino acid. A codon does not normally specify multiple different amino acids.'],
  11:['c','Backbone groups form the hydrogen bonds stabilizing α-helices and β-sheets. Many amino acid sequences can therefore adopt these structures, although side chains influence their propensity.'],
  12:['b','Amphipathic helices with hydrophobic stripes can wrap around one another, burying those stripes in a coiled-coil interface.'],
  13:['c','Increasing salt can weaken electrostatic attractions by screening charges and competing for ionic interactions, allowing bound protein to elute.'],
  14:['b','Introducing a hydrophilic side chain into a hydrophobic interior can destabilize folding and disrupt protein function.'],
  15:['d','A typical diploid human cell contains two haploid genome complements, one inherited from each parent. D uses “genome” in that haploid sense; DNA quantity also depends on cell-cycle stage.'],
  16:['d','A nucleosome repeat including linker DNA is often approximated as 200 base pairs, so ten repeats span roughly 2,000 base pairs. Each core contains two H2A molecules.'],
  17:['b','Many genes from the mitochondrial ancestor were lost or transferred to nuclear DNA. Numerous mitochondrial proteins are now encoded in the nucleus and imported.'],
  18:['c','In the classical packing model: DNA double helix, nucleosomes (“beads on a string”), 30 nm fiber, then looped chromatin. Regular 30 nm fibers are not universal in living cells.'],
  19:['a','Lysine and arginine are positively charged near physiological pH and can interact with the negatively charged phosphate backbone of RNA.'],
  20:['a','Active euchromatin is most transcriptionally active, followed by quiescent euchromatin, facultative heterochromatin, and constitutive heterochromatin in this simplified ranking.'],
  21:['c','DNA polymerases synthesize both strands 5′ to 3′. The leading strand is continuous; the lagging strand is assembled from Okazaki fragments.'],
  22:['a','Single-stranded DNA-binding proteins stabilize unwound DNA and limit reannealing. Replicative polymerases commonly proofread, and origins can support two replication forks.'],
  24:['b','B is the expected answer for bacterial DnaB helicase, which travels 5′ to 3′ on the lagging-strand template. Eukaryotic CMG helicase instead moves 3′ to 5′ on the leading-strand template, so the question needs that bacterial context.'],
  25:['b','Telomerase is a reverse transcriptase that uses an internal RNA template to extend the 3′ end of telomeric DNA.'],
  26:['c','In proofreading DNA polymerases, polymerization and 3′ to 5′ exonuclease proofreading take place at separate functional sites. DNA synthesis proceeds 5′ to 3′.'],
  27:['d','DNA ligase seals nicks between adjacent DNA fragments. Loss of ligase leaves newly synthesized fragments unjoined.'],
  28:['c','Intrinsic bacterial termination involves an RNA hairpin followed by a U-rich RNA–DNA hybrid with weak base pairing. Stop codons terminate translation, not transcription.'],
  29:['d','All four are RNA gene products: mRNA, tRNA, telomerase RNA, and small nuclear RNA. Not all genes encode proteins.'],
  30:['b','The orientation of the promoter positions RNA polymerase to transcribe one DNA strand in the correct direction.'],
  31:['d','D is the selected best answer: human genomic sequencing data can be used to locate introns in known protein-coding genes. B is also biologically plausible, but D is the answer used for this practice midterm.'],
  33:['b','The mRNA cap contains a distinctive 5′-to-5′ triphosphate linkage joining a modified guanosine to the first transcript nucleotide.'],
  34:['d','Promoter recognition positions bacterial RNA polymerase to initiate downstream, conventionally at +1. The promoter does not specify that the first transcribed bases must be AUG.'],
  35:['a','Blocking pairing between bacterial rRNA and the Shine–Dalgarno sequence targets bacterial translation initiation. The other processes are less selective for bacteria.'],
  36:['d','Read the supplied RNA from right to left to obtain the 5′ to 3′ direction. The first AUG gives AUG–CUU–UGG–UAG: methionine–leucine–tryptophan, then stop.'],
  37:['a','The insertion changes the reading frame and introduces an immediate stop after the initial methionine, truncating the protein. The before/after sequences provide enough information without a diagram.'],
  38:['b','Mature tRNAs contain modified bases, such as inosine and pseudouridine, in addition to the four standard RNA bases.'],
  39:['c','Ribosomal RNA provides the catalytic peptidyl-transferase center that forms peptide bonds, making the ribosome a ribozyme.'],
  40:['d','All four pairings occur: DNA–RNA during transcription, rRNA–mRNA in bacterial initiation, tRNA–mRNA during decoding, and snRNA–pre-mRNA during splicing.']
};
const boundaries = [...source.matchAll(/(?<![\d-])(\d{1,2})\.\s*(?=[A-Z])/g)];
const allQuestions = boundaries.map((m,index)=>{
  const body=source.slice(m.index+m[0].length,boundaries[index+1]?.index ?? source.length).trim();
  const first=body.search(/\s[a-d]\.\s/);
  const options=[...body.slice(first).matchAll(/\s([a-d])\.\s+(.*?)(?=\s[a-d]\.\s|$)/gs)].map(([,id,text])=>({id,text:`${id}. ${text.replace(/\s+/g,' ').trim()}`}));
  const number=Number(m[1]), answer=answers[number];
  return {number,prompt:body.slice(0,first).replace(/\s+/g,' ').trim(),options,correct:answer?.[0]||null,explanation:answer?.[1]||'',tag:`Source question ${number}`,note:!answer && number===31?'Both B and D describe valid projects. E. coli poly(A) polymerase is template-independent, and human genomic sequence can be used to locate introns in known genes. The single-answer format has no unique correct option.':''};
});
if(allQuestions.length!==40 || allQuestions.some((q,i)=>q.number!==i+1 || q.options.length!==4))throw Error('Midterm import incomplete');
// Question 23 also loses the essential bold/underlined base in the text export.
const omitted=[3,8,23,32];
const questions=allQuestions.filter(q=>!omitted.includes(q.number));
let page=fs.readFileSync('biology-practice-exam.html','utf8');
const start=page.indexOf('const practiceQuestions='),end=page.indexOf('function Ws(){',start);
if(start<0||end<0)throw Error('Exam template structure changed');
let home=fs.readFileSync('practice-exam-home.js','utf8').replaceAll('EXAM','MIDTERM').replaceAll('Exam','Midterm').replaceAll('exam','midterm').replaceAll('115','40');
home=home.replace('questions requiring missing images','questions requiring missing images or highlighting');
const footer=home.indexOf("    el('p',{style:{...muted,fontSize:12}},'Answer notes: '");
home=home.slice(0,footer)+`    el('p',{style:{...muted,fontSize:12}},'Answer notes: ',el('a',{href:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4210606/',target:'_blank',rel:'noopener noreferrer'},'Eukaryotic origins'), ' · ',el('a',{href:'https://www.ncbi.nlm.nih.gov/books/NBK6253/',target:'_blank',rel:'noopener noreferrer'},'Bacterial RNA polyadenylation'))\n  );\n}\n`;
page=page.slice(0,start)+`const practiceQuestions=${JSON.stringify(questions,null,2)};\nconst missingQuestionNumbers=[];\nconst omittedImageQuestions=${JSON.stringify(omitted)};\nconst sourceQuestionCount=40;\nconst practiceProgressKey="practice:biol130-midterm:"+practiceQuestions.map(q=>q.number+q.correct).join("-");\n${home}\n`+page.slice(end);
page=page.replaceAll('BIOL 130 Practice Exam','BIOL 130 Practice Midterm').replaceAll('Practice-exam.txt','Practice-midterm.txt').replaceAll('practice exam','practice midterm').replaceAll('Practice exam home','Practice midterm home').replace('var Ei="biol130-practice/"','var Ei="biol130-midterm/"');
fs.writeFileSync('biology-practice-midterm.html',page);
let review=fs.readFileSync('biology-review.html','utf8');
const linkStyle="display:inline-block;color:#eef2f0;font:600 13px system-ui,sans-serif;text-decoration:none;padding:8px 14px;border:1px solid #3a454d;border-radius:999px;text-align:center";
review=review.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/,`<nav aria-label="Quiz navigation" style="background:#141a1f;padding:10px 16px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap"><a href="index.html" style="${linkStyle}">&larr; Back to quiz</a><div style="margin-left:auto;display:flex;flex-direction:column;gap:8px"><a href="biology-practice-midterm.html" style="${linkStyle}">BIOL 130 Practice Midterm &rarr;</a><a href="biology-practice-exam.html" style="${linkStyle}">BIOL 130 Practice Exam &rarr;</a></div></nav>`);
fs.writeFileSync('biology-review.html',review);
console.log('Midterm built: 40 source questions, 4 omitted for missing visuals, 36 scored and no unscored questions.');

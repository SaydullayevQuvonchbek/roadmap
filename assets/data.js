// ---- Ma'lumotlar: haftalar, masalalar, ko'nikmalar, shablonlar ----
const WEEKS = [
  {n:1,  phase:1, title:"Massivlar, hash map, two pointers",       sec:"3–5-bo'lim",  goal:"Intervyu formatiga ko'nikish: har masalani ovoz chiqarib, protokol bo'yicha yeching."},
  {n:2,  phase:1, title:"Sliding window, prefix sum",              sec:"4–5-bo'lim",  goal:"\"Kengaytir → toraytir → yangila\" shabloni va {0,1} boshlang'ich prefiks yozuvi avtomatga chiqsin."},
  {n:3,  phase:1, title:"Binary search",                           sec:"6-bo'lim",    goal:"Bitta firstTrue shabloni bilan hammasini yeching; har yechimni n = 0, 1, 2 da qo'lda tekshiring."},
  {n:4,  phase:1, title:"Stack va monoton strukturalar",           sec:"7-bo'lim",    goal:"Hafta oxirida 84 va 239 ni kodga qaramasdan yoza olish."},
  {n:5,  phase:1, title:"Linked list",                             sec:"8-bo'lim",    goal:"Pointer aniqligi. Yengil hafta — qolgan vaqt 1–4-haftalarning 7 kunlik takrorlariga."},
  {n:6,  phase:2, title:"Daraxtlar",                               sec:"9-bo'lim",    goal:"Har masalada avval \"bu funksiya bitta qism daraxt uchun nimani qaytaradi?\" — bir jumlada."},
  {n:7,  phase:2, title:"Heap, Top-K, intervallar",                sec:"10-bo'lim",   goal:"Har masalada kamida ikki yondashuvni aytib, birini tanlash — trade-off mashqi."},
  {n:8,  phase:2, title:"Graflar I: grid, BFS/DFS, topologik",     sec:"11-bo'lim",   goal:"push va visited = true yonma-yon — shu odatni mustahkamlash."},
  {n:9,  phase:2, title:"Graflar II: DSU, Dijkstra + backtracking",sec:"11–12-bo'lim",goal:"DSU va Dijkstra shablonlarini yoddan; backtracking'da apply/undo simmetriyasi."},
  {n:10, phase:3, title:"DP I: chiziqli, grid, knapsack",          sec:"13-bo'lim",   goal:"Holat ta'rifini bir jumlada ovoz chiqarib aytish; 322 ni top-down va bottom-up ikki marta yozish."},
  {n:11, phase:3, title:"DP II: ketma-ketlik, palindrom, interval",sec:"13-bo'lim",   goal:"Eng og'ir hafta — kuniga 3 masaladan oshirmang, har birini to'liq tushuntirib yeching."},
  {n:12, phase:4, title:"Bitlar, Trie, BIT + 6 mock",              sec:"15-bo'lim",   goal:"12 yangi masala + 6 mock: tasodifiy 2 Medium, 45 daqiqa, IDE'siz, ovoz chiqarib."},
  {n:13, phase:5, title:"Bonus Hard (12 haftadan keyin)",          sec:"Qo'shimcha",  goal:"Medium'ni 25 daqiqada ishonchli yechadigan bo'lgach — haftasiga 2–3 tadan."}
];

const PHASES = [
  {n:1, weeks:"1–5-hafta",  title:"Poydevor va chiziqli strukturalar", text:"Kontest odatlarini intervyu tiliga tarjima qilish: aniqlashtirish, brute force → optimal, gapirib yozish. Massiv, oyna, binary search, stack, linked list."},
  {n:2, weeks:"6–9-hafta",  title:"Daraxt, graf, backtracking",         text:"Rekursiv fikrlash va grafni to'g'ri qurish. Google'ning \"imzo\" masalalari (Word Ladder, Alien Dictionary, LRU) shu bosqichda."},
  {n:3, weeks:"10–11-hafta",title:"Dinamik dasturlash va greedy",        text:"Holat ta'rifini gapirib bera olish. Knapsack sikl yo'nalishi, LIS, string DP, interval DP, holat mashinasi."},
  {n:4, weeks:"12-hafta",   title:"Mock intervyular va Hard",            text:"45 daqiqalik rejim, IDE'siz. 6 ta mock, xatolar daftarini yopish, zaif mavzularni qayta o'tish."},
  {n:5, weeks:"13–16-hafta",title:"Ariza va intervyu loop'i",            text:"Rezyume va profil, referral, behavioral hikoyalar (STAR), L4+ uchun system design asoslari, haftasiga 5–8 takror masala. Telefon skrining → onsite."}
];

// [id, nom, slug, daraja, pattern, hafta, premium?, muqobil]
const PROBLEMS = [
 [1,"Two Sum","two-sum","E","Hash map — to'ldiruvchi qidirish",1],
 [217,"Contains Duplicate","contains-duplicate","E","Hash set",1],
 [242,"Valid Anagram","valid-anagram","E","26 ta chastota massivi",1],
 [49,"Group Anagrams","group-anagrams","M","Kalit bo'yicha guruhlash",1],
 [347,"Top K Frequent Elements","top-k-frequent-elements","M","Hash map + bucket sort O(n)",1],
 [238,"Product of Array Except Self","product-of-array-except-self","M","Prefiks va suffiks ko'paytma",1],
 [128,"Longest Consecutive Sequence","longest-consecutive-sequence","M","Hash set, faqat boshlanish nuqtadan yurish",1],
 [36,"Valid Sudoku","valid-sudoku","M","Uch xil hash set",1],
 [53,"Maximum Subarray","maximum-subarray","M","Kadane — birinchi DP tuyg'usi",1],
 [189,"Rotate Array","rotate-array","M","Uch marta teskari aylantirish",1],
 [48,"Rotate Image","rotate-image","M","Transpoze + qatorni teskari qilish",1],
 [125,"Valid Palindrome","valid-palindrome","E","Qarama-qarshi pointer",1],
 [167,"Two Sum II","two-sum-ii-input-array-is-sorted","M","Qarama-qarshi pointer, saralangan massiv",1],
 [11,"Container With Most Water","container-with-most-water","M","Kichik tomonni siljitish isboti",1],
 [15,"3Sum","3sum","M","Saralash + two pointer + dublikat",1],
 [26,"Remove Duplicates from Sorted Array","remove-duplicates-from-sorted-array","E","Sekin/tez pointer, in-place",1],
 [283,"Move Zeroes","move-zeroes","E","Sekin/tez pointer",1],
 [42,"Trapping Rain Water","trapping-rain-water","H","Two pointer + ikki tomonlama maksimum",1],

 [3,"Longest Substring Without Repeating Characters","longest-substring-without-repeating-characters","M","O'zgaruvchan oyna asosi",2],
 [209,"Minimum Size Subarray Sum","minimum-size-subarray-sum","M","Eng qisqa oyna",2],
 [567,"Permutation in String","permutation-in-string","M","Qat'iy uzunlikdagi oyna + chastota",2],
 [424,"Longest Repeating Character Replacement","longest-repeating-character-replacement","M","Oyna + maksimal chastota",2],
 [76,"Minimum Window Substring","minimum-window-substring","H","need / have hisobi",2],
 [930,"Binary Subarrays With Sum","binary-subarrays-with-sum","M","atMost hiylasi",2],
 [1248,"Count Number of Nice Subarrays","count-number-of-nice-subarrays","M","atMost hiylasi",2],
 [992,"Subarrays with K Different Integers","subarrays-with-k-different-integers","H","atMost(k) − atMost(k−1)",2],
 [303,"Range Sum Query – Immutable","range-sum-query-immutable","E","Prefix sum asosi",2],
 [560,"Subarray Sum Equals K","subarray-sum-equals-k","M","Prefix sum + hash map",2],
 [974,"Subarray Sums Divisible by K","subarray-sums-divisible-by-k","M","Qoldiq bo'yicha prefiks, manfiy qoldiq",2],
 [525,"Contiguous Array","contiguous-array","M","0 → −1 almashtirish",2],
 [523,"Continuous Subarray Sum","continuous-subarray-sum","M","Qoldiq + eng erta indeks",2],
 [1109,"Corporate Flight Bookings","corporate-flight-bookings","M","Difference array",2],
 [1094,"Car Pooling","car-pooling","M","Difference array",2],
 [1074,"Number of Submatrices That Sum to Target","number-of-submatrices-that-sum-to-target","H","2D → 1D siqish + 560",2],

 [704,"Binary Search","binary-search","E","Shablon asosi",3],
 [35,"Search Insert Position","search-insert-position","E","lower_bound",3],
 [278,"First Bad Version","first-bad-version","E","Birinchi true",3],
 [34,"Find First and Last Position of Element","find-first-and-last-position-of-element-in-sorted-array","M","lower_bound + upper_bound",3],
 [153,"Find Minimum in Rotated Sorted Array","find-minimum-in-rotated-sorted-array","M","Aylantirilgan massiv",3],
 [33,"Search in Rotated Sorted Array","search-in-rotated-sorted-array","M","Saralangan yarimni aniqlash",3],
 [162,"Find Peak Element","find-peak-element","M","Saralanmagan massivda binary search",3],
 [74,"Search a 2D Matrix","search-a-2d-matrix","M","2D → 1D indeks",3],
 [981,"Time Based Key-Value Store","time-based-key-value-store","M","Hash map + binary search dizayni",3],
 [875,"Koko Eating Bananas","koko-eating-bananas","M","Javob bo'yicha binary search",3],
 [1011,"Capacity To Ship Packages Within D Days","capacity-to-ship-packages-within-d-days","M","Javob bo'yicha",3],
 [1482,"Minimum Number of Days to Make m Bouquets","minimum-number-of-days-to-make-m-bouquets","M","Javob bo'yicha",3],
 [410,"Split Array Largest Sum","split-array-largest-sum","H","Javob bo'yicha, greedy tekshiruv",3],
 [4,"Median of Two Sorted Arrays","median-of-two-sorted-arrays","H","Bo'lish nuqtasi ustida binary search",3],

 [20,"Valid Parentheses","valid-parentheses","E","Stack asosi",4],
 [155,"Min Stack","min-stack","M","Qo'shimcha minimum steki",4],
 [150,"Evaluate Reverse Polish Notation","evaluate-reverse-polish-notation","M","Stack bilan ifoda hisoblash",4],
 [739,"Daily Temperatures","daily-temperatures","M","Monoton stack — keyingi kattaroq",4],
 [496,"Next Greater Element I","next-greater-element-i","E","Monoton stack + hash map",4],
 [503,"Next Greater Element II","next-greater-element-ii","M","Aylanma massiv — 2n sikl",4],
 [901,"Online Stock Span","online-stock-span","M","Monoton stack, oldingi kattaroq",4],
 [853,"Car Fleet","car-fleet","M","Saralash + stack",4],
 [84,"Largest Rectangle in Histogram","largest-rectangle-in-histogram","H","Monoton stack cho'qqisi",4],
 [85,"Maximal Rectangle","maximal-rectangle","H","84 ni har qatorga qo'llash",4],
 [239,"Sliding Window Maximum","sliding-window-maximum","H","Monoton deque",4],
 [227,"Basic Calculator II","basic-calculator-ii","M","Son to'plash + oldingi amalni qo'llash",4],
 [394,"Decode String","decode-string","M","Ikki stack: son va satr",4],
 [402,"Remove K Digits","remove-k-digits","M","Monoton stack + greedy",4],

 [206,"Reverse Linked List","reverse-linked-list","E","Uch pointerli reverse",5],
 [21,"Merge Two Sorted Lists","merge-two-sorted-lists","E","Dummy node",5],
 [19,"Remove Nth Node From End of List","remove-nth-node-from-end-of-list","M","Dummy + k qadam oldinda pointer",5],
 [141,"Linked List Cycle","linked-list-cycle","E","Floyd",5],
 [142,"Linked List Cycle II","linked-list-cycle-ii","M","Floyd + sikl boshi isboti",5],
 [876,"Middle of the Linked List","middle-of-the-linked-list","E","Fast/slow",5],
 [143,"Reorder List","reorder-list","M","O'rta + reverse + merge",5],
 [234,"Palindrome Linked List","palindrome-linked-list","E","O'rta + reverse, O(1) xotira",5],
 [2,"Add Two Numbers","add-two-numbers","M","Dummy + carry",5],
 [138,"Copy List with Random Pointer","copy-list-with-random-pointer","M","Hash map yoki oraliq tugun hiylasi",5],
 [25,"Reverse Nodes in k-Group","reverse-nodes-in-k-group","H","Bo'laklab reverse",5],
 [146,"LRU Cache","lru-cache","M","list + unordered_map, splice",5],

 [104,"Maximum Depth of Binary Tree","maximum-depth-of-binary-tree","E","Rekursiya bazasi",6],
 [226,"Invert Binary Tree","invert-binary-tree","E","Rekursiya",6],
 [100,"Same Tree","same-tree","E","Ikki daraxtni parallel yurish",6],
 [572,"Subtree of Another Tree","subtree-of-another-tree","E","100 ni har tugunda chaqirish",6],
 [543,"Diameter of Binary Tree","diameter-of-binary-tree","E","\"Ikki javob\" naqshi",6],
 [110,"Balanced Binary Tree","balanced-binary-tree","E","Erta to'xtash (−1 qaytarish)",6],
 [102,"Binary Tree Level Order Traversal","binary-tree-level-order-traversal","M","BFS qatlamlari",6],
 [199,"Binary Tree Right Side View","binary-tree-right-side-view","M","Qatlamning oxirgi elementi",6],
 [103,"Binary Tree Zigzag Level Order Traversal","binary-tree-zigzag-level-order-traversal","M","BFS + yo'nalish almashinuvi",6],
 [111,"Minimum Depth of Binary Tree","minimum-depth-of-binary-tree","E","BFS bilan erta to'xtash",6],
 [1448,"Count Good Nodes in Binary Tree","count-good-nodes-in-binary-tree","M","Yo'l bo'yicha maksimumni pastga uzatish",6],
 [98,"Validate Binary Search Tree","validate-binary-search-tree","M","Oraliq uzatish",6],
 [230,"Kth Smallest Element in a BST","kth-smallest-element-in-a-bst","M","Inorder",6],
 [235,"Lowest Common Ancestor of a BST","lowest-common-ancestor-of-a-binary-search-tree","M","BST xossasi",6],
 [236,"Lowest Common Ancestor of a Binary Tree","lowest-common-ancestor-of-a-binary-tree","M","Klassik rekursiya",6],
 [105,"Construct Binary Tree from Preorder and Inorder","construct-binary-tree-from-preorder-and-inorder-traversal","M","Indeks boshqaruvi + hash map",6],
 [106,"Construct Binary Tree from Inorder and Postorder","construct-binary-tree-from-inorder-and-postorder-traversal","M","105 ning aksi",6],
 [124,"Binary Tree Maximum Path Sum","binary-tree-maximum-path-sum","H","\"Ikki javob\" + manfiy hissani kesish",6],
 [297,"Serialize and Deserialize Binary Tree","serialize-and-deserialize-binary-tree","H","Preorder + null belgisi",6],
 [437,"Path Sum III","path-sum-iii","M","Prefix sum daraxtda",6],

 [703,"Kth Largest Element in a Stream","kth-largest-element-in-a-stream","E","Hajmi k min-heap",7],
 [1046,"Last Stone Weight","last-stone-weight","E","Max-heap",7],
 [215,"Kth Largest Element in an Array","kth-largest-element-in-an-array","M","Heap vs quickselect",7],
 [973,"K Closest Points to Origin","k-closest-points-to-origin","M","Top-K, masofa taqqoslash",7],
 [23,"Merge k Sorted Lists","merge-k-sorted-lists","H","Heap bilan birlashtirish",7],
 [295,"Find Median from Data Stream","find-median-from-data-stream","H","Ikki heap",7],
 [621,"Task Scheduler","task-scheduler","M","Heap + greedy (formula ham bor)",7],
 [767,"Reorganize String","reorganize-string","M","Eng chastotali elementni oldin",7],
 [56,"Merge Intervals","merge-intervals","M","Boshlanish bo'yicha saralash",7],
 [57,"Insert Interval","insert-interval","M","Uch bosqichli o'tish",7],
 [435,"Non-overlapping Intervals","non-overlapping-intervals","M","Tugash bo'yicha greedy",7],
 [452,"Minimum Number of Arrows to Burst Balloons","minimum-number-of-arrows-to-burst-balloons","M","435 ning varianti",7],
 [986,"Interval List Intersections","interval-list-intersections","M","Ikki pointer intervallar ustida",7],
 [252,"Meeting Rooms","meeting-rooms","E","Saralash + qo'shni tekshiruv",7,true,"56"],
 [253,"Meeting Rooms II","meeting-rooms-ii","M","Sweep line yoki heap",7,true,"1094"],
 [218,"The Skyline Problem","the-skyline-problem","H","Sweep line + heap",7],

 [200,"Number of Islands","number-of-islands","M","Grid DFS/BFS asosi",8],
 [695,"Max Area of Island","max-area-of-island","M","Grid DFS, hisoblash",8],
 [1020,"Number of Enclaves","number-of-enclaves","M","Chegaradan boshlab belgilash",8],
 [130,"Surrounded Regions","surrounded-regions","M","Chegaradan teskari DFS",8],
 [417,"Pacific Atlantic Water Flow","pacific-atlantic-water-flow","M","Ikki okeandan teskari DFS",8],
 [994,"Rotting Oranges","rotting-oranges","M","Ko'p manbali BFS",8],
 [542,"01 Matrix","01-matrix","M","Ko'p manbali BFS",8],
 [1162,"As Far from Land as Possible","as-far-from-land-as-possible","M","Ko'p manbali BFS",8],
 [286,"Walls and Gates","walls-and-gates","M","Ko'p manbali BFS",8,true,"542"],
 [1091,"Shortest Path in Binary Matrix","shortest-path-in-binary-matrix","M","8 yo'nalishli BFS",8],
 [934,"Shortest Bridge","shortest-bridge","M","DFS (orolni topish) + BFS",8],
 [133,"Clone Graph","clone-graph","M","DFS + hash map",8],
 [207,"Course Schedule","course-schedule","M","Topologik saralash, sikl",8],
 [210,"Course Schedule II","course-schedule-ii","M","Kahn tartibi",8],
 [269,"Alien Dictionary","alien-dictionary","H","Qirralarni chiqarish + topo",8,true,"2115"],
 [785,"Is Graph Bipartite?","is-graph-bipartite","M","BFS bilan ikki rangga bo'yash",8],
 [127,"Word Ladder","word-ladder","H","BFS + qo'shni yasash",8],
 [433,"Minimum Genetic Mutation","minimum-genetic-mutation","M","127 ning kichik varianti",8],

 [547,"Number of Provinces","number-of-provinces","M","DSU asosi",9],
 [684,"Redundant Connection","redundant-connection","M","DSU — sikl yasovchi qirra",9],
 [721,"Accounts Merge","accounts-merge","M","DSU + guruhlash",9],
 [323,"Number of Connected Components","number-of-connected-components-in-an-undirected-graph","M","DSU",9,true,"547"],
 [743,"Network Delay Time","network-delay-time","M","Dijkstra asosi",9],
 [1631,"Path With Minimum Effort","path-with-minimum-effort","M","Dijkstra, dist = maksimum",9],
 [787,"Cheapest Flights Within K Stops","cheapest-flights-within-k-stops","M","Bellman-Ford / qatlamli BFS",9],
 [778,"Swim in Rising Water","swim-in-rising-water","H","Dijkstra yoki binary search + BFS",9],
 [22,"Generate Parentheses","generate-parentheses","M","Pruning shartlari — boshlang",9],
 [78,"Subsets","subsets","M","Ol / olma",9],
 [90,"Subsets II","subsets-ii","M","Dublikatni o'tkazib yuborish",9],
 [46,"Permutations","permutations","M","used massivi",9],
 [47,"Permutations II","permutations-ii","M","!used[i-1] sharti",9],
 [39,"Combination Sum","combination-sum","M","Elementni qayta ishlatish",9],
 [40,"Combination Sum II","combination-sum-ii","M","Bir martalik + dublikat",9],
 [17,"Letter Combinations of a Phone Number","letter-combinations-of-a-phone-number","M","Klassik, ko'p so'raladi",9],
 [79,"Word Search","word-search","M","Grid + belgilab qaytarish",9],
 [51,"N-Queens","n-queens","H","O(1) diagonal tekshiruv",9],

 [70,"Climbing Stairs","climbing-stairs","E","Holat ta'rifi asosi",10],
 [746,"Min Cost Climbing Stairs","min-cost-climbing-stairs","E","1D DP",10],
 [198,"House Robber","house-robber","M","Ol / olma, O(1) xotira",10],
 [213,"House Robber II","house-robber-ii","M","Aylanma — 198 ni ikki marta",10],
 [91,"Decode Ways","decode-ways","M","1D, ikki o'tish",10],
 [139,"Word Break","word-break","M","1D DP + hash set",10],
 [152,"Maximum Product Subarray","maximum-product-subarray","M","Min va max ikkalasini saqlash",10],
 [62,"Unique Paths","unique-paths","M","Grid DP asosi",10],
 [63,"Unique Paths II","unique-paths-ii","M","To'siqli grid",10],
 [64,"Minimum Path Sum","minimum-path-sum","M","Grid DP",10],
 [120,"Triangle","triangle","M","Pastdan yuqoriga",10],
 [931,"Minimum Falling Path Sum","minimum-falling-path-sum","M","Grid, uch yo'nalish",10],
 [322,"Coin Change","coin-change","M","Cheksiz knapsack, minimal",10],
 [518,"Coin Change II","coin-change-ii","M","Kombinatsiya soni — sikl tartibi",10],
 [377,"Combination Sum IV","combination-sum-iv","M","Tartiblangan — sikl tartibi",10],
 [416,"Partition Equal Subset Sum","partition-equal-subset-sum","M","0/1 knapsack, bool",10],
 [494,"Target Sum","target-sum","M","416 ga keltirish",10],
 [1049,"Last Stone Weight II","last-stone-weight-ii","M","416 ning varianti",10],
 [121,"Best Time to Buy and Sell Stock","best-time-to-buy-and-sell-stock","E","Minimalni kuzatish",10],
 [122,"Best Time to Buy and Sell Stock II","best-time-to-buy-and-sell-stock-ii","M","Holat mashinasi asosi",10],

 [300,"Longest Increasing Subsequence","longest-increasing-subsequence","M","O(n²) va O(n log n) ikkalasi",11],
 [1143,"Longest Common Subsequence","longest-common-subsequence","M","Ikki indeksli holat",11],
 [72,"Edit Distance","edit-distance","M","Uch amal",11],
 [583,"Delete Operation for Two Strings","delete-operation-for-two-strings","M","LCS orqali",11],
 [97,"Interleaving String","interleaving-string","M","2D bool DP",11],
 [115,"Distinct Subsequences","distinct-subsequences","H","Sanash DP",11],
 [5,"Longest Palindromic Substring","longest-palindromic-substring","M","Markazdan kengaytirish",11],
 [516,"Longest Palindromic Subsequence","longest-palindromic-subsequence","M","Interval DP yoki teskari satr bilan LCS",11],
 [647,"Palindromic Substrings","palindromic-substrings","M","Markazdan kengaytirish",11],
 [131,"Palindrome Partitioning","palindrome-partitioning","M","Backtracking + palindrom jadvali",11],
 [132,"Palindrome Partitioning II","palindrome-partitioning-ii","H","1D DP + palindrom jadvali",11],
 [123,"Best Time to Buy and Sell Stock III","best-time-to-buy-and-sell-stock-iii","H","Holat mashinasi, 2 tranzaksiya",11],
 [309,"Best Time to Buy and Sell Stock with Cooldown","best-time-to-buy-and-sell-stock-with-cooldown","M","Holat mashinasi",11],
 [714,"Best Time to Buy and Sell Stock with Transaction Fee","best-time-to-buy-and-sell-stock-with-transaction-fee","M","Holat mashinasi",11],
 [312,"Burst Balloons","burst-balloons","H","Interval DP — \"oxirgi yorilgan\" hiylasi",11],
 [10,"Regular Expression Matching","regular-expression-matching","H","2D string DP",11],
 [329,"Longest Increasing Path in a Matrix","longest-increasing-path-in-a-matrix","H","Grid + memoizatsiya",11],
 [698,"Partition to K Equal Sum Subsets","partition-to-k-equal-sum-subsets","M","Bitmask DP yoki backtracking",11],

 [136,"Single Number","single-number","E","XOR xossalari",12],
 [191,"Number of 1 Bits","number-of-1-bits","E","x & (x − 1)",12],
 [338,"Counting Bits","counting-bits","E","Bit + DP",12],
 [268,"Missing Number","missing-number","E","XOR yoki yig'indi formulasi",12],
 [287,"Find the Duplicate Number","find-the-duplicate-number","M","Floyd massivda",12],
 [50,"Pow(x, n)","powx-n","M","Tez darajaga ko'tarish, manfiy n",12],
 [208,"Implement Trie (Prefix Tree)","implement-trie-prefix-tree","M","Trie asosi",12],
 [211,"Design Add and Search Words Data Structure","design-add-and-search-words-data-structure","M","Trie + '.' uchun DFS",12],
 [212,"Word Search II","word-search-ii","H","Trie + backtracking — Google klassikasi",12],
 [421,"Maximum XOR of Two Numbers in an Array","maximum-xor-of-two-numbers-in-an-array","M","Bit Trie",12],
 [307,"Range Sum Query – Mutable","range-sum-query-mutable","M","Fenwick Tree",12],
 [315,"Count of Smaller Numbers After Self","count-of-smaller-numbers-after-self","H","BIT + koordinata siqish",12],

 [1235,"Maximum Profit in Job Scheduling","maximum-profit-in-job-scheduling","H","DP + binary search — Google'da tez-tez",13],
 [44,"Wildcard Matching","wildcard-matching","H","10 ning varianti",13],
 [887,"Super Egg Drop","super-egg-drop","H","DP + binary search / holatni teskari ta'riflash",13],
 [1000,"Minimum Cost to Merge Stones","minimum-cost-to-merge-stones","H","Interval DP, k bo'lak",13],
 [224,"Basic Calculator","basic-calculator","H","Qavsli kalkulyator, stack",13],
 [460,"LFU Cache","lfu-cache","H","Dizayn — 146 ning davomi",13],
 [2402,"Meeting Rooms III","meeting-rooms-iii","H","Ikki heap",13],
 [1584,"Min Cost to Connect All Points","min-cost-to-connect-all-points","M","MST — Prim yoki Kruskal (DSU)",13],
 [847,"Shortest Path Visiting All Nodes","shortest-path-visiting-all-nodes","H","Bitmask BFS",13],
 [1125,"Smallest Sufficient Team","smallest-sufficient-team","H","Bitmask DP",13],
 [493,"Reverse Pairs","reverse-pairs","H","Merge sort yoki BIT",13],
 [37,"Sudoku Solver","sudoku-solver","H","Backtracking holat boshqaruvi",13]
];

const STATUSES = [
  {k:"none",  label:"Boshlanmagan"},
  {k:"ac",    label:"Yechildi"},
  {k:"r7",    label:"7 kunlik takror"},
  {k:"r30",   label:"30 kunlik takror"},
  {k:"done",  label:"O'zlashtirildi"}
];

const SKILLS = [
  {id:"alg", title:"Algoritm patternlari", note:"Qo'llanmaning yadrosi. Har birini \"tanib olish belgisi + shablon + 3 masala yoddan\" darajasida.", items:[
    ["Two pointers va sliding window","Kengaytir → toraytir → yangila; atMost(k) − atMost(k−1) hiylasi"],
    ["Hash map, prefix sum, difference array","{0,1} boshlang'ich yozuv; qoldiq bo'yicha prefiks"],
    ["Binary search — massivda","Bitta firstTrue shabloni, [lo, hi), lo < hi"],
    ["Binary search — javob bo'yicha","Monoton tekshiruv funksiyasi, O(n log(max))"],
    ["Monoton stack va deque","Keyingi kattaroq/kichikroq; 84, 239 yoddan"],
    ["Linked list","Dummy, reverse, Floyd va sikl boshi isboti"],
    ["Daraxt: rekursiya, BFS qatlamlari, BST","\"Ikki javob\" naqshi (543, 124); oraliq uzatish"],
    ["Heap va Top-K","Hajmi k min-heap; ikki heap medianasi; quickselect g'oyasi"],
    ["Intervallar va sweep line","Boshlanish bo'yicha birlashtirish, tugash bo'yicha tanlash"],
    ["Graf: BFS/DFS, grid, topologik saralash","Ko'p manbali BFS; Kahn + sikl tekshiruvi"],
    ["DSU va Dijkstra","Yo'l siqish + rank; eskirgan yozuvni tashlash"],
    ["Backtracking","apply/undo simmetriyasi; dublikat va pruning"],
    ["Dinamik dasturlash","Holat ta'rifi bir jumlada; knapsack sikl yo'nalishi; LIS, LCS, interval, holat mashinasi"],
    ["Greedy va exchange argument","30 soniyalik isbot; qarshi misol topish odati"],
    ["Bit, Trie, Fenwick","XOR xossalari; Trie O(L); BIT 15 qator"]
  ]},
  {id:"cpp", title:"C++ mahorati", note:"Intervyu tili — C++. Kontest odatlarini intervyu uslubiga o'tkazish.", items:[
    ["STL konteynerlar va murakkabliklari","vector, unordered_map, map, set, priority_queue, deque — qachon qaysi"],
    ["Lambda comparator va lower_bound/upper_bound","Intervallarni saralash, chastota bo'yicha saralash"],
    ["priority_queue min-heap va juftliklar","greater<> bilan; {masofa, tugun}"],
    ["Toshib ketish va unsigned tuzoqlari","l + (r − l) / 2; (int)v.size() − 1; long long"],
    ["O'qiladigan nomlar, global massivsiz","left/right/windowSum/seen; #define yo'q"],
    ["IDE'siz kod yozish","Avtoto'ldirishsiz 20 ta masala; oddiy matn muharririda"]
  ]},
  {id:"comm", title:"Intervyu muloqoti", note:"GCA bahosining katta qismi shu yerda. 45 daqiqani boshqarish.", items:[
    ["Aniqlashtiruvchi 5 savol","Hajm, diapazon, bo'shlik, takror, qaysi javob"],
    ["Brute force → murakkablik → optimallashtirish","Uch jumlalik yondashuv skripti"],
    ["Gapirib yozish","Har 20–30 soniyada fikrni ovozga chiqarish"],
    ["Qo'lda test va edge case ro'yxati","Bo'sh, bitta, ikkita, bir xil, chegaraviy son"],
    ["Murakkablikni aniq aytish","Vaqt va xotira, rekursiya steki bilan"],
    ["Tiqilganda 3 qadam","Misol qo'lda, tuzilmalar ro'yxati, cheklovni bo'shatish"],
    ["6 ta mock intervyu","Ovoz yozib, keyin eshitib tahlil qilish"]
  ]},
  {id:"beh", title:"Xulq-atvor: Googleyness va Leadership", note:"45 daqiqalik alohida raund. STAR formatida 6–8 tayyor hikoya.", items:[
    ["Konflikt va hamkorlik hikoyasi","Jamoada kelishmovchilikni qanday hal qildingiz"],
    ["Xato va undan o'rganish hikoyasi","Intellektual kamtarlik — Googleyness'ning yadrosi"],
    ["Noaniqlikda qaror hikoyasi","Talab aniq bo'lmaganda nima qildingiz"],
    ["Tashabbus (emergent leadership) hikoyasi","Rasmiy lavozimsiz yo'nalish bergan holat"],
    ["Foydalanuvchi uchun qaror hikoyasi","Texnik qulaylik emas, foydalanuvchi manfaati"],
    ["Loyihani texnik chuqurlikda tushuntirish","KMP loyihasi yoki ish tajribasi: nima, nega, trade-off"],
    ["Intervyuerga savollar","Har raund oxirida 2–3 ta o'ylangan savol"]
  ]},
  {id:"sd", title:"System design asoslari (L4+ uchun)", note:"L3 uchun shart emas, L4 da bitta raund. Chuqur emas — tuzilmani gapirib bera olish.", items:[
    ["Asosiy bloklar","Load balancer, cache, CDN, DB replikatsiya va sharding, queue"],
    ["Hisob-kitob","QPS, saqlash hajmi, o'tkazish qobiliyati — konvert orqasida"],
    ["Klassik 4 dizayn","URL shortener, rate limiter, chat, news feed"],
    ["Trade-off tili","CAP, izchillik vs mavjudlik, SQL vs NoSQL"],
    ["2 ta mock design","Qog'ozda 45 daqiqa, diagramma bilan"]
  ]},
  {id:"read", title:"Kod o'qish va AI-assisted raund", note:"2026-yildan ayrim jamoalarda Gemini bilan repozitoriyda xato topish raundi.", items:[
    ["Haftada 1 marta boshqalar yechimini o'qish","LeetCode discuss'dan yechim olib, xato/optimallashtirish topish"],
    ["AI chiqargan kodni tekshirish odati","Ishonmang — test yozing, chegarani tekshiring"],
    ["Kichik repo'ni 20 daqiqada tushunish","GitHub'dan 500–1000 qatorli loyiha: arxitekturani chizib chiqish"]
  ]},
  {id:"prof", title:"Profil va ariza", note:"12-haftadan boshlab parallel. Loop 2–3 oy davom etadi — vaqtni hisobga oling.", items:[
    ["Rezyume — 1 sahifa, natijaga yo'naltirilgan","Loyihalar, texnologiyalar, o'lchanadigan natijalar"],
    ["LinkedIn va GitHub profili","2–3 tugallangan loyiha, README bilan"],
    ["Referral qidirish","Google'da ishlaydigan tanish yoki hamjamiyat orqali"],
    ["Darajani to'g'ri tanlash","L3 (yangi bitiruvchi / 0–2 yil) yoki L4 (2+ yil)"],
    ["Ariza vaqtini rejalash","Mock'lar yaxshi o'tgach — telefon skrining 2–4 haftadan keyin"]
  ]},
  {id:"kt", title:"Kotlin / KMP parallel yo'l", note:"Yakshanbalar uchun. Intervyu C++ da — Kotlin portfel uchun.", items:[
    ["Yakshanbalik KMP loyihasi","LeetCode progressini kuzatuvchi ilova: shared modul + Compose UI"],
    ["Har 2–3 haftada bitta masala Kotlinda","Tilni sovutmaslik uchun yetarli"],
    ["Kotlin kolleksiyalari va PriorityQueue","IntArray vs Array<Int>; min-heap default"],
    ["Compose asoslarini yangilash","State, recomposition, navigation"]
  ]}
];

const TEMPLATES = [
  {id:"sw", title:"Sliding window — o'zgaruvchan oyna", tag:"4-bo'lim", code:
`int longestWindow(const string& s, int k) {
    unordered_map<char,int> cnt;
    int best = 0, left = 0;
    for (int right = 0; right < (int)s.size(); ++right) {
        ++cnt[s[right]];                        // 1. kengaytir
        while ((int)cnt.size() > k) {           // 2. shart buzilsa toraytir
            if (--cnt[s[left]] == 0) cnt.erase(s[left]);
            ++left;
        }
        best = max(best, right - left + 1);     // 3. javobni yangila
    }
    return best;
}
// "Aynan k ta" kerak bo'lsa:  exactly(k) = atMost(k) - atMost(k - 1)`},
  {id:"tp", title:"Two pointers — qarama-qarshi", tag:"4-bo'lim", code:
`int l = 0, r = (int)a.size() - 1;
while (l < r) {
    int sum = a[l] + a[r];
    if (sum == target) return {l, r};
    if (sum < target) ++l;      // kattaroq kerak
    else --r;                   // kichikroq kerak
}
// Nega to'g'ri: a[l] + a[r] < target bo'lsa, a[l] hech qanday r' <= r bilan yetmaydi.`},
  {id:"ps", title:"Prefix sum + hash map", tag:"5-bo'lim", code:
`int subarraySum(vector<int>& a, int k) {
    unordered_map<long long,int> cnt{{0, 1}};   // bo'sh prefiks — 1 marta
    long long run = 0; int ans = 0;
    for (int x : a) {
        run += x;
        auto it = cnt.find(run - k);
        if (it != cnt.end()) ans += it->second;
        ++cnt[run];
    }
    return ans;
}
// Difference array: diff[l] += v; diff[r+1] -= v; oxirida prefiks.`},
  {id:"bs", title:"Binary search — yagona shablon + javob bo'yicha", tag:"6-bo'lim", code:
`// [lo, hi) da check(x) birinchi true bo'ladigan x. Yo'q bo'lsa hi.
int firstTrue(int lo, int hi, function<bool(int)> check) {
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid)) hi = mid;     // mid javob bo'lishi mumkin
        else            lo = mid + 1; // mid aniq javob emas
    }
    return lo;
}

// LC 875 — javob bo'yicha binary search
int minEatingSpeed(vector<int>& piles, int h) {
    auto feasible = [&](long long k) {
        long long hours = 0;
        for (int p : piles) hours += (p + k - 1) / k;
        return hours <= h;
    };
    int lo = 1, hi = *max_element(piles.begin(), piles.end());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (feasible(mid)) hi = mid; else lo = mid + 1;
    }
    return lo;
}`},
  {id:"ms", title:"Monoton stack va deque", tag:"7-bo'lim", code:
`// Har i uchun keyingi qat'iy kattaroq elementning indeksi
vector<int> nextGreater(const vector<int>& a) {
    int n = a.size(); vector<int> res(n, -1); stack<int> st;
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && a[st.top()] < a[i]) { res[st.top()] = i; st.pop(); }
        st.push(i);
    }
    return res;
}

// LC 84 — histogrammadagi eng katta to'rtburchak
int largestRectangleArea(vector<int> h) {
    h.push_back(0); stack<int> st; int best = 0;
    for (int i = 0; i < (int)h.size(); ++i) {
        while (!st.empty() && h[st.top()] >= h[i]) {
            int height = h[st.top()]; st.pop();
            int left = st.empty() ? -1 : st.top();
            best = max(best, height * (i - left - 1));
        }
        st.push(i);
    }
    return best;
}

// LC 239 — oyna maksimumi, monoton deque
vector<int> maxSlidingWindow(vector<int>& a, int k) {
    deque<int> dq; vector<int> res;
    for (int i = 0; i < (int)a.size(); ++i) {
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(a[dq.front()]);
    }
    return res;
}`},
  {id:"ll", title:"Linked list — reverse va Floyd", tag:"8-bo'lim", code:
`ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* nxt = head->next;   // 1. eslab qol
        head->next = prev;            // 2. burab qo'y
        prev = head; head = nxt;      // 3. siljit
    }
    return prev;
}

ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if (slow == fast) {
            ListNode* p = head;
            while (p != slow) { p = p->next; slow = slow->next; }
            return p;                 // sikl boshi
        }
    }
    return nullptr;
}`},
  {id:"tree", title:"Daraxt — \"ikki javob\" naqshi, BFS qatlamlari, LCA", tag:"9-bo'lim", code:
`// LC 124 — funksiya bir narsani qaytaradi, boshqasini global yangilaydi
int best = INT_MIN;
int gain(TreeNode* node) {
    if (!node) return 0;
    int l = max(0, gain(node->left));
    int r = max(0, gain(node->right));
    best = max(best, node->val + l + r);   // tugun "cho'qqi" bo'lgan yo'l
    return node->val + max(l, r);          // yuqoriga faqat bitta shox
}

// BFS qatlamlar bilan
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res; if (!root) return res;
    queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        int sz = q.size(); vector<int> level;
        for (int i = 0; i < sz; ++i) {
            TreeNode* n = q.front(); q.pop(); level.push_back(n->val);
            if (n->left) q.push(n->left);
            if (n->right) q.push(n->right);
        }
        res.push_back(level);
    }
    return res;
}

// LC 236 — LCA
TreeNode* lca(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* l = lca(root->left, p, q);
    TreeNode* r = lca(root->right, p, q);
    if (l && r) return root;
    return l ? l : r;
}`},
  {id:"heap", title:"Top-K va ikki heap medianasi", tag:"10-bo'lim", code:
`// LC 215 — k-chi eng katta, O(n log k)
int findKthLargest(vector<int>& a, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;   // min-heap
    for (int x : a) { pq.push(x); if ((int)pq.size() > k) pq.pop(); }
    return pq.top();
}

// LC 295 — oqim medianasi
priority_queue<int> lo;                                  // pastki yarim
priority_queue<int, vector<int>, greater<int>> hi;       // yuqori yarim
void addNum(int x) {
    lo.push(x); hi.push(lo.top()); lo.pop();
    if (hi.size() > lo.size()) { lo.push(hi.top()); hi.pop(); }
}
double findMedian() {
    return lo.size() > hi.size() ? lo.top() : (lo.top() + hi.top()) / 2.0;
}`},
  {id:"grid", title:"Grid BFS va topologik saralash (Kahn)", tag:"11-bo'lim", code:
`const int dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1};
void bfs(vector<vector<char>>& g, int sr, int sc) {
    int n = g.size(), m = g[0].size();
    queue<pair<int,int>> q; q.push({sr, sc}); g[sr][sc] = '0';   // darrov belgila
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; ++d) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= n || nc < 0 || nc >= m || g[nr][nc] != '1') continue;
            g[nr][nc] = '0'; q.push({nr, nc});   // push va belgilash yonma-yon
        }
    }
}

// LC 207/210 — bo'sh natija = sikl bor
vector<int> topoSort(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n); vector<int> indeg(n, 0);
    for (auto& e : edges) { adj[e[1]].push_back(e[0]); ++indeg[e[0]]; }
    queue<int> q; for (int i = 0; i < n; ++i) if (!indeg[i]) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop(); order.push_back(u);
        for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
    }
    return (int)order.size() == n ? order : vector<int>{};
}`},
  {id:"dsu", title:"DSU va Dijkstra", tag:"11-bo'lim", code:
`struct DSU {
    vector<int> p, r;
    explicit DSU(int n) : p(n), r(n, 0) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a; if (r[a] == r[b]) ++r[a];
        return true;
    }
};

vector<long long> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {
    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(n, INF);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    dist[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;                 // eskirgan yozuv
        for (auto& [v, w] : adj[u])
            if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push({dist[v], v}); }
    }
    return dist;
}`},
  {id:"bt", title:"Backtracking — universal shablon va dublikat", tag:"12-bo'lim", code:
`void backtrack(State& cur, Result& res) {
    if (isComplete(cur)) { res.push_back(cur); return; }   // 1. bazis
    for (auto& choice : choices(cur)) {                    // 2. variantlar
        if (!valid(cur, choice)) continue;                 // 3. pruning
        apply(cur, choice);                                // 4. tanla
        backtrack(cur, res);                               // 5. chuqurlash
        undo(cur, choice);                                 // 6. ORQAGA QAYT
    }
}

// Dublikatlar (saralangan massiv):
//   subset/kombinatsiya: if (j > i && a[j] == a[j-1]) continue;
//   permutatsiya:        if (i > 0 && a[i] == a[i-1] && !used[i-1]) continue;`},
  {id:"dp", title:"DP — knapsack yo'nalishi, LIS, LCS, edit distance", tag:"13-bo'lim", code:
`// 0/1 knapsack — sig'im TESKARI;  cheksiz — TO'G'RI yo'nalishda
for (int i = 0; i < n; ++i)
    for (int w = W; w >= wt[i]; --w)
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
for (int i = 0; i < n; ++i)
    for (int w = coin[i]; w <= W; ++w)
        dp[w] = min(dp[w], dp[w - coin[i]] + 1);

// LIS O(n log n) — tails uzunlikni beradi, ketma-ketlikning o'zini EMAS
vector<int> tails;
for (int x : a) {
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) tails.push_back(x); else *it = x;
}

// LCS va Edit Distance
dp[i][j] = (s[i-1] == t[j-1]) ? dp[i-1][j-1] + 1 : max(dp[i-1][j], dp[i][j-1]);
dp[i][j] = (s[i-1] == t[j-1]) ? dp[i-1][j-1]
         : 1 + min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]});`},
  {id:"trie", title:"Trie va Fenwick (BIT)", tag:"15-bo'lim", code:
`struct Trie {
    struct Node { Node* ch[26] = {}; bool end = false; };
    Node* root = new Node();
    void insert(const string& w) {
        Node* cur = root;
        for (char c : w) { int i = c - 'a'; if (!cur->ch[i]) cur->ch[i] = new Node(); cur = cur->ch[i]; }
        cur->end = true;
    }
    bool search(const string& w, bool prefixOnly = false) {
        Node* cur = root;
        for (char c : w) { int i = c - 'a'; if (!cur->ch[i]) return false; cur = cur->ch[i]; }
        return prefixOnly || cur->end;
    }
};

struct BIT {
    vector<long long> t;
    explicit BIT(int n) : t(n + 1, 0) {}
    void add(int i, long long v) { for (++i; i < (int)t.size(); i += i & -i) t[i] += v; }
    long long sum(int i) { long long s = 0; for (++i; i > 0; i -= i & -i) s += t[i]; return s; }
    long long range(int l, int r) { return sum(r) - (l ? sum(l - 1) : 0); }
};`}
];

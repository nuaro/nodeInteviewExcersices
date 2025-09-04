const readline = require('readline');

class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.gameOver = false;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    initializeBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));

        // Place pawns
        for (let i = 0; i < 8; i++) {
            board[1][i] = { type: 'pawn', color: 'black' };
            board[6][i] = { type: 'pawn', color: 'white' };
        }

        // Place other pieces
        const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        for (let i = 0; i < 8; i++) {
            board[0][i] = { type: pieces[i], color: 'black' };
            board[7][i] = { type: pieces[i], color: 'white' };
        }

        return board;
    }

    displayBoard() {
        console.clear();
        console.log('   a b c d e f g h');
        console.log('   ---------------');

        for (let row = 0; row < 8; row++) {
            let rowStr = `${8 - row} |`;
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    rowStr += this.getPieceSymbol(piece) + '|';
                } else {
                    rowStr += ' |';
                }
            }
            console.log(rowStr);
        }

        console.log('   ---------------');
        console.log(`Current player: ${this.currentPlayer}`);
    }

    getPieceSymbol(piece) {
        const symbols = {
            'pawn': piece.color === 'white' ? 'P' : 'p',
            'rook': piece.color === 'white' ? 'R' : 'r',
            'knight': piece.color === 'white' ? 'N' : 'n',
            'bishop': piece.color === 'white' ? 'B' : 'b',
            'queen': piece.color === 'white' ? 'Q' : 'q',
            'king': piece.color === 'white' ? 'K' : 'k'
        };
        return symbols[piece.type];
    }

    parsePosition(pos) {
        if (pos.length !== 2) return null;
        const col = pos[0].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
        const row = 8 - parseInt(pos[1]);

        if (col < 0 || col > 7 || row < 0 || row > 7) return null;
        return { row, col };
    }

    isValidMove(from, to) {
        const fromPos = this.parsePosition(from);
        const toPos = this.parsePosition(to);

        if (!fromPos || !toPos) return false;

        const piece = this.board[fromPos.row][fromPos.col];
        if (!piece || piece.color !== this.currentPlayer) return false;

        const targetPiece = this.board[toPos.row][toPos.col];
        if (targetPiece && targetPiece.color === piece.color) return false;

        return this.isValidPieceMove(piece, fromPos, toPos);
    }

    isValidPieceMove(piece, from, to) {
        const rowDiff = to.row - from.row;
        const colDiff = to.col - from.col;
        const absRowDiff = Math.abs(rowDiff);
        const absColDiff = Math.abs(colDiff);

        switch (piece.type) {
            case 'pawn':
                const direction = piece.color === 'white' ? -1 : 1;
                const startRow = piece.color === 'white' ? 6 : 1;

                // Forward move
                if (colDiff === 0) {
                    if (rowDiff === direction && !this.board[to.row][to.col]) return true;
                    if (from.row === startRow && rowDiff === 2 * direction && !this.board[to.row][to.col]) return true;
                }
                // Diagonal capture
                if (absColDiff === 1 && rowDiff === direction && this.board[to.row][to.col]) return true;
                return false;

            case 'rook':
                if (rowDiff === 0 || colDiff === 0) {
                    return this.isPathClear(from, to);
                }
                return false;

            case 'bishop':
                if (absRowDiff === absColDiff) {
                    return this.isPathClear(from, to);
                }
                return false;

            case 'queen':
                if (rowDiff === 0 || colDiff === 0 || absRowDiff === absColDiff) {
                    return this.isPathClear(from, to);
                }
                return false;

            case 'knight':
                return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);

            case 'king':
                return absRowDiff <= 1 && absColDiff <= 1;

            default:
                return false;
        }
    }

    isPathClear(from, to) {
        const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
        const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

        let currentRow = from.row + rowStep;
        let currentCol = from.col + colStep;

        while (currentRow !== to.row || currentCol !== to.col) {
            if (this.board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true;
    }

    makeMove(from, to) {
        const fromPos = this.parsePosition(from);
        const toPos = this.parsePosition(to);

        const piece = this.board[fromPos.row][fromPos.col];
        this.board[toPos.row][toPos.col] = piece;
        this.board[fromPos.row][fromPos.col] = null;

        // Check if king was captured (simple game over condition)
        if (this.isKingCaptured()) {
            this.gameOver = true;
            console.log(`Game Over! ${this.currentPlayer} wins!`);
        }

        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }

    isKingCaptured() {
        const opponent = this.currentPlayer === 'white' ? 'black' : 'white';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.type === 'king' && piece.color === opponent) {
                    return false;
                }
            }
        }
        return true;
    }

    async promptMove() {
        return new Promise((resolve) => {
            this.rl.question('Enter your move (e.g., "e2 e4") or "quit": ', (input) => {
                resolve(input.trim());
            });
        });
    }

    async gameLoop() {
        while (!this.gameOver) {
            this.displayBoard();

            const input = await this.promptMove();

            if (input.toLowerCase() === 'quit') {
                console.log('Thanks for playing!');
                break;
            }

            const parts = input.split(' ');
            if (parts.length !== 2) {
                console.log('Invalid format. Use: e2 e4');
                await this.waitForEnter();
                continue;
            }

            const [from, to] = parts;

            if (!this.isValidMove(from, to)) {
                console.log('Invalid move! Try again.');
                await this.waitForEnter();
                continue;
            }

            this.makeMove(from, to);
        }

        this.rl.close();
    }

    async waitForEnter() {
        return new Promise((resolve) => {
            this.rl.question('Press Enter to continue...', () => {
                resolve();
            });
        });
    }
}

// Start the game
console.log('Welcome to Chess!');
console.log('Enter moves in the format: from to (e.g., "e2 e4")');
console.log('Type "quit" to exit the game.\n');

const game = new ChessGame();
game.gameLoop();